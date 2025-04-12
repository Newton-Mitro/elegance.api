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
