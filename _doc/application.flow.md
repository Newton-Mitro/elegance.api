## 🧩 MODULE OVERVIEW
```
Module--------------Description
Auth----------------Handles login, JWT token, role-based access
User----------------Staff & customer info (walk-in or registered), roles, profile
ServiceCategory-----Categories like Hair, Skin, Bridal
Service-------------Individual services (name, price, duration, description)
Appointment---------Booking system for services (scheduled, walk-in, status tracking)
Invoice-------------Linked to appointments, includes VAT, discounts, loyalty points, payment
ProductCategory-----Product grouping (e.g., Hair Care, Skin Care)
Product-------------Product catalog with price, description, stock
Sale----------------Point-of-sale system for product sales
SaleProduct---------Items sold per sale, quantity, price tracking
Stock---------------Tracks product stock (purchases, sales, adjustments, expiry)
LoyaltyPoint--------Earned/redeemed points, linked to registered users
Discount------------Promo codes and active discount campaigns
Voucher-------------Accounting vouchers (payment, receipt, journal, contra)
Ledger--------------Chart of accounts (cash, bank, revenue, expense, etc.)
JournalEntry--------Individual double-entry records (debit/credit)
MonthEnd------------Month-wise closing, net profit calc, locked period
Refund--------------Partial or full refunds, tied to sales or invoices
Reports-------------Generate summaries (sales, services, income, expenses, stock)
Notifications*------(Optional) Notify customers via SMS/email
Scheduler-----------For monthly tasks like closing books, expiring discounts
Settings------------System-wide settings (VAT %, loyalty settings, etc.)
```
### 🧱 DOMAIN STRUCTURE IDEA
```bash
src/
├── auth/
├── users/
├── services/
│   ├── service-categories/
│   └── services/
├── appointments/
├── invoices/
├── discounts/
├── loyalty/
├── products/
│   ├── product-categories/
│   ├── products/
│   ├── stock/
│   └── sales/
├── refunds/
├── accounting/
│   ├── vouchers/
│   ├── ledgers/
│   ├── journal-entries/
│   └── month-end/
├── reports/
├── notifications/
├── scheduler/
├── settings/
```

## 💁‍♀️ Service Appointment Flow (Walk-in + Registered)

```
Step    Action	                                Affected Tables	                        Notes
1️⃣      Walk-in customer arrives	        Appointment	                        No entry in User, userId is null
2️⃣	Receptionist books appointment	        Appointment, AppointmentService	        Services linked, isWalkIn = true
3️⃣	Registered customer books appointment	User, Appointment, AppointmentService	If user not in system, create User (role = CUSTOMER)
4️⃣	Appointment completed	                Appointment (status → COMPLETED)	Indicates service was delivered
5️⃣	Payment created	                        Invoice	                                userId can be null (for walk-ins) or registered
6️⃣	Loyalty calculated	                LoyaltyPoint	                        Only if userId is NOT null
7️⃣	Products purchased (optional)	        Sale, SaleProduct	                customerId = userId (optional for walk-ins)

```

### 📊 FLOW DIAGRAM 
```
                 ┌──────────────┐
                 │ Walk-in?     │
                 └────┬─────────┘
                      │
            ┌─────────▼───────────┐
            │ No (Registered)     │
            └────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │ Create/Retrieve User    │  ← 🟢 User
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │ Book Appointment        │  ← 🟢 Appointment, AppointmentService
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │ Mark Completed          │  ← 🟢 Appointment (status)
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │ Create Invoice          │  ← 🟢 Invoice
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │ Add Loyalty Points      │  ← 🟢 LoyaltyPoint
        └─────────────────────────┘
```

## 💄 PRODUCT SALE FLOW (Walk-in + Registered)
```
Step	Action	Affected Tables	Notes
1️⃣	Customer (walk-in or registered) chooses products	Product (read)	No changes yet
2️⃣	Staff creates a Sale entry	Sale	customerId is optional (nullable for walk-ins)
3️⃣	Add each product to the sale	SaleProduct	Store quantity and price at time of sale
4️⃣	Total is calculated (with VAT, discount if any)	Sale	totalAmount, paymentStatus, paymentMethod updated
5️⃣	Stock is reduced	Product	Reduce stock by SaleProduct.quantity
6️⃣	Loyalty is applied (if registered)	LoyaltyPoint	Optional, based on customerId
```
### 📊 FLOW DIAGRAM
```
                ┌──────────────┐
                │ Customer     │
                │ Walk-in/Reg  │
                └─────┬────────┘
                      │
         ┌────────────▼────────────────┐
         │ Create Sale                 │  ← 🟢 `Sale`
         └────────────┬────────────────┘
                      │
         ┌────────────▼────────────────┐
         │ Add Products to Sale        │  ← 🟢 `SaleProduct`
         └────────────┬────────────────┘
                      │
         ┌────────────▼───────────────┐
         │ Calculate Totals, VAT, etc │  ← 🟢 `Sale` (update)
         └────────────┬───────────────┘
                      │
          ┌───────────▼─────────────┐
          │ Reduce Product Stock    │  ← 🟢 `Product` (stock - qty)
          └───────────┬─────────────┘
                      │
          ┌───────────▼─────────────┐
          │ Add Loyalty (if user)   │  ← 🟢 `LoyaltyPoint`
          └─────────────────────────┘
```
## 🔁 REFUND FLOW (Product & Appointment)
🔸 Supports:
- Product refunds (partial or full)
- Appointment refunds (for services)
- Manual or automatic refund approvals
- Tracks refund reason, amount, and status

### 🧾 FLOW OVERVIEW
```
Step	Action	Affected Tables	Notes
1️⃣	Staff initiates a refund	Refund	New entry with refundedAmount, reason, RefundStatus
2️⃣	Refund is linked to a sale or invoice	Refund (via saleId or invoiceId)	One of these must be filled
3️⃣	Stock restored (for product refunds)	Product	Increase stock by SaleProduct.quantity
4️⃣	Refund status updated (e.g., APPROVED)	Refund	Manual or auto-approved
5️⃣	Refund processed (cash, original method, etc.)	-	Depends on business policy
6️⃣	Loyalty points are deducted (if already awarded)	LoyaltyPoint	Only if refunded fully and user was registered
```
### 🔄 FLOW DIAGRAM
```
                ┌───────────────┐
                │ Staff/Manager │
                └─────┬─────────┘
                      │
           ┌──────────▼────────────┐
           │ Create Refund entry   │ ← 🟢 `Refund`
           └──────────┬────────────┘
                      │
       ┌──────────────▼──────────────┐
       │ Link to Sale or Appointment │ ← `saleId` or `invoiceId`
       └──────────────┬──────────────┘
                      │
     ┌────────────────▼──────────────┐
     │ Restock (for product refund)  │ ← 🟢 `Product`
     └────────────────┬──────────────┘
                      │
       ┌──────────────▼────────────┐
       │ Update Refund Status      │ ← `RefundStatus = APPROVED`
       └──────────────┬────────────┘
                      │
     ┌────────────────▼──────────────┐
     │ Loyalty Point Adjustment      │ ← 🟢 `LoyaltyPoint`
     └───────────────────────────────┘
```

## 🗂️ STOCK MANAGEMENT FLOW 

### 🗂️ STOCK MANAGEMENT FLOW DIAGRAM
```
           +-------------------+
           |   Add New Stock   |
           |  (Purchase Entry) |
           +--------+----------+
                    |
                    v
         +----------------------+
         |  Update ProductStock |
         |  (quantity += X)     |
         +--------+-------------+
                  |
                  v
         +----------------------+
         |   Product Available  |
         +--------+-------------+
                  |
   +--------------+---------------+
   |                              |
   v                              v
[ Sale of Product ]         [ Adjustment / Damage ]
   |                              |
   v                              v
Update ProductStock         Update ProductStock
(quantity -= sold)          (quantity -= damaged)
   |                              |
   +--------------+---------------+
                  |
                  v
       +-------------------------+
       |    Track Stock History  |
       | (Sale, Refund, Adjust)  |
       +-------------------------+
```
### 🧾 FLOW BREAKDOWN
**✅ 1. Purchase (Add Stock)**
- Staff adds new stock entry (e.g., 50 shampoo bottles)
- Quantity is added to Product.stock
- Record purchase in accounting (Inventory, Cash/Bank)

**✅ 2. Product Sale**
- When a product is sold, its quantity is reduced
- System deducts sold quantity from Product.stock
- Records COGS and revenue in accounting

**✅ 3. Refund**
- If product is returned:
  - Quantity added back to Product.stock
  - Accounting adjusts for returned value

**✅ 4. Stock Adjustment (Loss/Damage)**
- Manual entry for damaged, lost, or expired items
- Reduces Product.stock
- Optionally logs who adjusted and why

## 💁‍♀️ 1. CUSTOMER MANAGEMENT

```
Flow                                    Notes
Walk-in or Registered customer          Both supported (User nullable)
Phone/email optional for walk-ins       Only needed for loyalty
Loyalty linked to registered users      Based on phone/email
```

## ✂️ 2. SERVICES & APPOINTMENTS

### Book Appointment Flow:

- Receptionist selects services
- Links them to an appointment
- Assigns staff (optional)
- Optionally links a customer
- Generates an invoice (unpaid)

Appointments can be scheduled or walk-in

## 🛒 3. PRODUCT SALES FLOW

### Sell Product:

- Receptionist selects product(s)
- Optionally links a customer
- System checks stock
- Discount applied (if any)
- Sale created
- Payment collected
- Loyalty points added
- Stock decremented

## 💰 4. INVOICES & PAYMENTS

### For Appointments:

- **Invoice** is created on booking

- Tracks:

  - Total, VAT, Final amount
  - Paid amount, method
  - Linked to Appointment & User

### For Product Sales:

- **Sale** is created with total, method, etc.
- Paid in full immediately

## 🎟 5. DISCOUNTS & VAT

### Discounts:

- Code-based (e.g. NEWYEAR20)
- Applied during appointment/sale
- Validated based on **isActive, startDate, endDate**

### VAT:

- Set per invoice (e.g., 15%)
- **vatAmount** and **finalAmount** auto-calculated

## 🎁 6. LOYALTY SYSTEM

```
Trigger                     Points Earned
Appointment Paid            Yes
Product Purchased           Yes
Refund Issued               Points reduced
```

- Points stored in LoyaltyPoint model
- Future support: redeem for discounts

## 🔁 7. REFUND FLOW

### When processing a refund:

1. Staff requests refund from sale
2. Refund model created (status PENDING)
3. Admin approves or rejects
4. If APPROVED:
   - Payment method credited
   - Loyalty points reversed
   - Inventory restocked

Refund status tracked in RefundStatus enum

## 📦 8. INVENTORY FLOW

- Stock is decremented on product sale
- Stock is incremented on refund
- Optionally: add StockEntry logs
- Alert when low stock (< threshold)

## 📊 9. REPORTS & ANALYTICS

```
Report Type                             Data Source
Daily Sales                             Sale, Invoice
Services Stats                          AppointmentService
Staff Performance                       Appointments served
VAT Collected                           From Invoice
Discount Usage                          By code and amount
Loyalty Earned/Used                     LoyaltyPoint
Stock Report                            Product
```

## 🧱 SYSTEM ARCHITECTURE

- NestJS backend (Modular)
- Prisma ORM with SQLite/MySQL
- REST API endpoints
- JWT-based Auth (Admin, Staff, etc.)
- Role-based Access Control (RBAC)


## 💰 ACCOUNTING INTEGRATION FLOW
### ✅ Define Ledger Accounts
First, ensure your accounting system has these Chart of Accounts:
```
Account Name	                  Type	              Code
Cash	                          Asset	              101
Bank	                          Asset	              102
Sales Revenue	                  Income	      401
Product Sales	                  Income	      402
VAT Payable	                  Liability	      201
Inventory	                  Asset	              103
Cost of Goods Sold	          Expense	      501
Refunds	                          Expense	      502
Loyalty Point Expense	          Expense	      503
Discount Given	                  Expense	      504
```
### 🛒 2. On Product Sale
Trigger: Sale completed (Sale is marked PAID)

Accounting Entries (Double Entry):

```
Debit	              Credit
Cash/Bank	
                      Product Sales
                      VAT Payable (if VAT exists)
```
You may also track Cost of Goods Sold:

```
Debit	                    Credit
Cost of Goods Sold	    Inventory
```

### 🔁 3. On Product Refund
Trigger: SaleProduct.refundStatus = REFUNDED

Accounting Entries:

Debit	Credit
Refunds (Expense)	Cash/Bank
Inventory	Cost of Goods Sold
### 🎁 4. On Loyalty Point Redemption
Trigger: Loyalty point used in sale

Accounting Entries:

Debit	Credit
Loyalty Point Expense	Cash/Bank/Product Sales
### 💳 5. On Discount Applied
Trigger: Discount applied to sale

Accounting Entries:

Debit	Credit
Discount Given	Product Sales
### 📥 6. On Stock Purchase
Trigger: Manager adds stock

Accounting Entries:

Debit	Credit
Inventory	Cash/Bank
(You can also use a Supplier Payable if it’s on credit.)

🔁 FLOW DIAGRAM
```lua
Sale Completed  ---> Create Accounting Voucher for Sale
Refund Issued   ---> Create Accounting Voucher for Refund
Stock Purchased ---> Create Voucher for Inventory Purchase
```

## 📊 ACCOUNTING ENTRIES – FULL EXAMPLES
### ✅ 1. Product Purchase Entry
Scenario: You purchase 100 shampoo bottles for ৳100 each (total ৳10,000)

Accounting Entry:

Account	Debit	Credit
Inventory	৳10,000	
Cash / Bank		৳10,000
➡️ This increases inventory and reduces cash.

### ✅ 2. Product Sale Entry
Scenario: You sell 2 bottles of shampoo at ৳200 each
COGS (Cost of Goods Sold) per unit = ৳100

Accounting Entry:

Account	Debit	Credit
Cash / Bank / Receivable	৳400	
Sales Revenue		৳400
Cost of Goods Sold (COGS)	৳200	
Inventory		৳200
➡️ This recognizes income and reduces inventory, while tracking cost.

### ✅ 3. Service Sale Entry
Scenario: Customer pays ৳1000 for a haircut

Accounting Entry:

Account	Debit	Credit
Cash / Bank / Receivable	৳1000	
Service Revenue		৳1000
### ✅ 4. Refund Entry
Scenario: Customer returns a shampoo (৳200), refund is given

Accounting Entry:

Account	Debit	Credit
Sales Return	৳200	
Cash / Bank / Payable		৳200
Inventory	৳100	
Cost of Goods Sold		৳100
➡️ This tracks the refund and restores the stock.

### ✅ 5. Discount Given
Scenario: ৳1000 service with 10% discount
Customer pays ৳900

Accounting Entry:

Account	Debit	Credit
Cash / Bank	৳900	
Discount Allowed	৳100	
Service Revenue		৳1000

### 6. 🔁 Loyalty Redemption 
**Scenario:**
🧍 Customer: Fatema
She is a registered customer.
Has 150 loyalty points.
Buys services worth ৳1000.
Redeems 100 points (1 point = ৳1).

**Accounting Entry:**
```
Account	                              	    
Cash	                                ৳900 ->Debit
Loyalty Points Liability Account      ৳100 ->Debit
Sales Revenue		                                      ৳1000 ->Credit
```
**This reflects:**

- Cash received
- Internal reduction using loyalty points
- Revenue properly recognized
