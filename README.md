# Beauty Parlor System with Prisma and NestJS

This repository contains a complete Beauty Parlor System built with NestJS, Prisma, and SQLite/MySQL. The system manages services, products, customers, appointments, and invoicing in a beauty parlor. It supports features like service categories, customer management, payment integration, discounts, VAT management, and loyalty rewards.

## 🔧 Features

- **Customer Management:** Walk-in & registered customers with loyalty points
- **Appointments & Services:** Service booking, time slots, and staff assignment
- **Sales & Refunds:** Product sales, invoicing, and refund handling
- **Inventory Management:** Batch tracking, expiry, purchase, sales, and adjustments
- **Accounting System:** Full sub-ledger & general ledger journal entries
- **Loyalty & Discounts:** Redeemable points and seasonal discounts
- **Monthly Financial Process:** Period-end accounting and inventory closure
- **Modular Architecture:** Domain-driven design with clean separation of modules

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
DATABASE_URL="mysql://username:password@localhost:3306/elegance"
```

**4. Generate Prisma client**

Run Prisma's CLI to generate the client and migrate the database.

```bash
npx prisma migrate dev --name init
```

**5. Seed the database**

You can seed the database with some initial data (services, products, categories) using the following command:

```bash
npm run seed
```

### Running the Application

After setting everything up, you can start the development server.

**1. Run the application**

```bash
npm run start:dev
```

**2. Open the application in your browser:**
By default, the app will run on http://localhost:3000.

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
