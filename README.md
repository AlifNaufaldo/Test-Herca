# My Web Application

This is a full-stack web application built with Express.js, Sequelize, and PostgreSQL for the backend, and Next.js with TypeScript for the frontend.

## Features
- PostgreSQL database management using Sequelize ORM
- RESTful API implementation with Express.js
- Frontend built with Next.js and TailwindCSS
- API requests handled with Axios
- Form validation using express-validator
- UI alerts using SweetAlert2

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

#### 1. Clone the repository:
```sh
git clone https://github.com/AlifNaufaldo/Test-Herca.git
cd Test-Herca
```

#### 2. Setup Backend (Server)
```sh
cd server
npm install
```

Create a `.env` file inside the `server` directory:
```ini
PORT=3001
```

Run database setup:
```sh
npx db:create
npx db:migrate
npx db:seed:all
```

Start the server:
```sh
npm run dev
```

#### 3. Setup Frontend (Client)
```sh
cd ../client
npm install
```

Start the client:
```sh
npm run dev
```

---

## Project Structure and Tech Stack
```
repo-root/
│── server/         # Backend (Express, Sequelize, PostgreSQL)
│── client/         # Frontend (Next.js, React, TailwindCSS)
```

## Scripts

### Server Scripts
- `npm run dev` - Start the backend in development mode
- `npm start` - Start the backend in production mode
- `npx db:create` - Create the database
- `npx db:migrate` - Run database migrations
- `npx db:seed:all` - Seed the database with initial data

### Client Scripts
- `npm run dev` - Start the frontend in development mode
- `npm run build` - Build the frontend for production
- `npm run start` - Start the frontend in production mode
- `npm run lint` - Run ESLint checks

---

## API Routes

### Penjualan
- `GET /penjualan/` - Get all sales
- `GET /penjualan/transaksi` - Get all transactions

### Marketing
- `GET /marketing/` - Get marketing commissions
- `GET /marketing/commission` - Get marketing commissions

### Pembayaran
- `POST /pembayaran/` - Create a new payment
- `GET /pembayaran/` - Get all payments
- `GET /pembayaran/:id` - Get payment by ID
- `PUT /pembayaran/:id` - Update payment amount
- `DELETE /pembayaran/:id` - Delete a payment

---

## License
This project is licensed under the MIT License.

---

## Author
[Muhammad Alif Naufaldo](https://github.com/AlifNaufaldo)

