Pizza Shop Application
The Pizza Shop is a web application built with Node.js, Express, MySQL, and Prisma. It allows users to browse and order pizzas, while also providing an admin panel for managing pizza categories, pizzas, and orders.

Features

User-facing features:

- List all available pizza products
- View the newest pizzas
- Filter pizzas by category
- Add pizzas to the cart
- Proceed to order
- View order history

Admin panel features:

- Create, read, update, and delete pizza categories
- Create, read, update, and delete pizzas
- Manage orders

Prerequisites
Make sure you have the following software installed on your machine:

- Node.js
- MySQL server

Installation

1. Clone the repository
2. Navigate to the project directory (backend)
3. Copy the .env.example file to .env
   PORT = 5000
   IPADDRESS = localhost
   DATABASE_URL="mysql://root:123456@localhost:3306/prisma-react"
   ACCESS_TOKEN_SECRET = secret
4. Install dependencies
   npm install
5. Set up the MySQL database:
   Create a new MySQL database for the application.
   Update the database connection details in the .env file with your MySQL credentials.
6. Generate the Prisma Client
   npx prisma generate
7. Migrate Database with Prisma
   npx prisma migrate dev
8. Start the server
   npm start
   Your express server will now be running on port 5000.

Folder Structure
The folder structure of the project is as follows:

backend/
routes/ - Defines the application routes and their handlers
middleware/ - Defines the application middlewares
services/ - Defines the database models
prisma/ - Defines the database schema using Prisma and migrations
migrations/ - Contains the database migration files for Prisma
