## 🧩 MODULES OVERVIEW

**- Customer Management**
**- Services & Appointments**
**- Product Sales**
**- Invoices & Payments**
**- Discounts & VAT**
**- Loyalty & Rewards**
**- Refunds**
**- Inventory & Stock Management**
**- Reports & Analytics**

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
