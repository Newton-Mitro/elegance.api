## 🧩 MODULES OVERVIEW

**Core Elegance**
- **Customer Management**
- **Services & Appointments**
- **Product Sales**
- **Invoices & Payments**
- **Discounts & VAT**
- **Loyalty & Rewards**
- **Refunds**
- **Inventory & Stock Management**
- **Reports & Analytics**

**Accounting**
- **Chart Of Accounts Management**
- **Voucher Management** Payment, Received, Journal, Contra, Purchase, Sales
- **Process Management** (Day-end, Month-end, Year-end)
- **Reports & Analytics** Trial Balance, Cash Flow, Profit & Loss, Balance Sheet

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
