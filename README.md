# Beauty Parlor System with Prisma and NestJS

This repository contains a complete Beauty Parlor System built with NestJS, Prisma, and SQLite/MySQL. The system manages services, products, customers, appointments, and invoicing in a beauty parlor. It supports features like service categories, customer management, payment integration, discounts, VAT management, and loyalty rewards.

## Features

- **Service Management:** Manage different services like haircuts, facials, and makeup.
- **Product Management:** Manage various beauty products for sale.
- **Appointment Scheduling:** Book appointments for services with status tracking.
- **Invoice Management:** Generate invoices for services provided, supporting different payment methods.
- **Payment Integration:** Handle customer payments and track status (Pending, Paid, etc.).
- **Loyalty & Reward System:** Reward customers with loyalty points for services.
- **Discounts & VAT:** Calculate VAT and apply discounts on services or products.
- **Admin Role:** Admin can manage all entities, including users, services, products, and appointments.
- **User Roles:** Managers, Receptionists, Stylists, and Customers have role-based access to the system.

## Getting Started

Follow these steps to get your local environment up and running.

### Prerequisites

- **Node.js** (v16 or higher)
- **NestJS CLI** (optional)
- **Prisma** CLI
- **SQLite** (default) or **MySQL** for production

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/beauty-parlor-system.git
cd beauty-parlor-system
```

**2. Install dependencies**

Install the dependencies using npm or yarn.

```bash
npm install
```

**3. Set up the database**

Configure the database URL in your .env file.

For SQLite (default):

```ini
DATABASE_URL="file:./dev.db"
```

For MySQL:

```ini
DATABASE_URL="mysql://username:password@localhost:3306/beautyparlor"
```

**4. Generate Prisma client**

Run Prisma's CLI to generate the client and migrate the database.

```bash
npx prisma migrate dev --name init
```

**5. Seed the database**

You can seed the database with some initial data (services, products, categories) using the following command:

```bash
npx prisma db seed
```

### Running the Application

After setting everything up, you can start the development server.

**1. Run the application**

```bash
npm run start:dev
```

**2. Open the application in your browser:**
By default, the app will run on http://localhost:3000.

### Folder Structure

Here's an overview of the project structure:

```ruby
src/
│
├── modules/                         # Core business modules
│   ├── product/                     # Product management (inventory, CRUD operations)
│   │   ├── dto/                     # Product DTOs
│   │   ├── entities/                # Product entity for database mapping
│   │   ├── product.controller.ts    # API controller for product endpoints
│   │   ├── product.service.ts       # Business logic for managing products
│   │   └── product.module.ts        # Module definition for products
│   │
│   ├── sale/                        # Sales transactions (handling product purchases, sales records)
│   │   ├── dto/                     # Sale-related DTOs
│   │   ├── entities/                # Entities related to sales (sale, sale products)
│   │   ├── sale.controller.ts       # API controller for sale operations
│   │   ├── sale.service.ts          # Business logic for sales transactions
│   │   └── sale.module.ts           # Module definition for sales
│   │
│   ├── invoice/                     # Invoice generation (handling invoices for completed sales)
│   │   ├── dto/                     # Invoice DTOs
│   │   ├── entities/                # Invoice entities (related to sales transactions)
│   │   ├── invoice.controller.ts    # API controller for invoice operations
│   │   ├── invoice.service.ts       # Business logic for invoice management
│   │   └── invoice.module.ts        # Module definition for invoices
│   │
│   ├── payment/                     # Payment processing (third-party gateways, manual payments)
│   │   ├── dto/                     # Payment DTOs
│   │   ├── payment.controller.ts    # API controller for payment operations
│   │   ├── payment.service.ts       # Payment processing logic
│   │   └── payment.module.ts        # Module definition for payments
│   │
│   ├── user/                        # User management (customers, staff, roles)
│   │   ├── dto/                     # User DTOs (including customer registration, login)
│   │   ├── entities/                # User entity for database (customer, staff)
│   │   ├── user.controller.ts       # API controller for user operations (register, login)
│   │   ├── user.service.ts          # Business logic for user management (creating users, authentication)
│   │   └── user.module.ts           # Module definition for users
│   │
│   ├── appointment/                 # Appointment management (booking, rescheduling)
│   │   ├── dto/                     # Appointment DTOs
│   │   ├── entities/                # Appointment entities (appointment, appointment services)
│   │   ├── appointment.controller.ts# API controller for appointment operations
│   │   ├── appointment.service.ts   # Business logic for appointment scheduling
│   │   └── appointment.module.ts    # Module definition for appointments
│   │
│   ├── service/                     # Service management (beauty services like haircuts, facials, etc.)
│   │   ├── dto/                     # Service DTOs (service registration, updates)
│   │   ├── entities/                # Service entity (e.g., haircut, manicure)
│   │   ├── service.controller.ts    # API controller for service operations
│   │   ├── service.service.ts       # Business logic for managing services
│   │   └── service.module.ts        # Module definition for services
│   │
│   ├── service-category/            # Service categories (hair, skin, nails, etc.)
│   │   ├── dto/                     # Service category DTOs
│   │   ├── entities/                # Service category entities (e.g., HAIR, SKIN)
│   │   ├── service-category.controller.ts # API controller for service category operations
│   │   ├── service-category.service.ts    # Business logic for service category management
│   │   └── service-category.module.ts     # Module definition for service categories
│   │
│   ├── discount/                    # Discount management (special offers, promotions)
│   │   ├── dto/                     # Discount DTOs (applying discounts, discount logic)
│   │   ├── entities/                # Discount entities (e.g., discount code, special offer)
│   │   ├── discount.controller.ts   # API controller for discount operations
│   │   ├── discount.service.ts      # Business logic for applying discounts
│   │   └── discount.module.ts       # Module definition for discounts
│   │
│   ├── loyalty/                     # Loyalty program (tracking points, rewards)
│   │   ├── dto/                     # Loyalty program DTOs (e.g., points earned, rewards)
│   │   ├── entities/                # Loyalty entities (customer points, rewards)
│   │   ├── loyalty.controller.ts    # API controller for loyalty program operations
│   │   ├── loyalty.service.ts       # Business logic for loyalty rewards
│   │   └── loyalty.module.ts        # Module definition for loyalty program
│   │
│   ├── vat/                         # VAT management (applying VAT to products and services)
│   │   ├── dto/                     # VAT DTOs (setting VAT rates, calculating VAT)
│   │   ├── entities/                # VAT entities (applying VAT rates to transactions)
│   │   ├── vat.controller.ts        # API controller for VAT management
│   │   ├── vat.service.ts           # Business logic for VAT handling
│   │   └── vat.module.ts            # Module definition for VAT management
│   │
│   ├── notification/                # Notification management (email, SMS)
│   │   ├── dto/                     # Notification DTOs (creating, sending notifications)
│   │   ├── notification.controller.ts # API controller for sending notifications
│   │   ├── notification.service.ts   # Business logic for sending notifications
│   │   └── notification.module.ts    # Module definition for notifications
│   │
│   └── report/                      # Reporting (sales reports, customer reports)
│       ├── dto/                     # Report DTOs (sales summaries, customer analytics)
│       ├── entities/                # Report entities (sale summaries, financials)
│       ├── report.controller.ts     # API controller for generating reports
│       ├── report.service.ts        # Business logic for generating reports
│       └── report.module.ts         # Module definition for reporting
│
├── common/                           # Common utilities and modules
│   ├── filters/                      # Global exception filters
│   ├── guards/                       # Auth guards
│   ├── interceptors/                 # Custom interceptors (logging, response formatting)
│   ├── pipes/                        # Custom pipes (validation, transformation)
│   └── utils/                        # Helper utility classes
│       └── date.util.ts              # Utility for date formatting, etc.
├── prisma/                           # Prisma client and related files
│   ├── prisma.service.ts             # Prisma service (database interactions)
│   ├── prisma.module.ts              # Prisma module (for DI and connection management)
│   ├── schema.prisma                 # Prisma schema
│   └── seed.ts                       # Seed data file for initial database population
|
├── auth/                             # Authentication-related logic (JWT, etc.)
│   ├── auth.controller.ts            # Auth API controller
│   ├── auth.service.ts               # Auth logic
│   ├── auth.module.ts                # Auth module definition
│   └── strategies/                   # JWT and other strategies
│       └── jwt.strategy.ts           # JWT authentication strategy
|
├── config/                           # Configuration files (database, services, etc.)
│   ├── app.config.ts                 # Main app configuration
│   ├── database.config.ts            # Database configuration
│   └── service.config.ts             # Service-specific configurations (like payment gateway)
|
├── app.module.ts                     # Main module, imports all feature modules
├── main.ts                           # Entry point for the NestJS application
└── .env                               # Environment variables
```

## API Endpoints

Here are some of the main API endpoints for managing services, appointments, and users:

### Services

**- GET /services -** List all services
**- POST /services -** Create a new service
**- GET /services/:id -** Get a service by ID
**- PUT /services/:id -** Update a service
**- DELETE /services/:id -** Delete a service

## Products

**- GET /products -** List all products
**- POST /products -** Add a new product
**- GET /products/:id -** Get a product by ID
**- PUT /products/:id -** Update a product
**- DELETE /products/:id -** Delete a product

## Users

**- GET /users -** List all users
**- POST /users -** Register a new user
**- GET /users/:id -** Get user details by ID
**- PUT /users/:id -** Update user information
**- DELETE /users/:id -** Delete a user

## Appointments

**- GET /appointments -** List all appointments
**- POST /appointments -** Book a new appointment
**- GET /appointments/:id -** Get appointment details by ID
**- PUT /appointments/:id -** Update an appointment
**- DELETE /appointments/:id -** Cancel an appointment

## Technologies Used

**- NestJS:** A framework for building efficient and scalable server-side applications.
**- Prisma:** ORM for interacting with the database in a type-safe manner.
**- SQLite/MySQL:** Database for storing services, appointments, products, and user data.
**- TypeScript:** A statically typed superset of JavaScript.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

We welcome contributions to this project! To contribute:

1. Fork this repository.
2. Create a new branch (git checkout -b feature-name).
3. Commit your changes (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature-name).
5. Create a new Pull Request.
