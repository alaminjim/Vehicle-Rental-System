  # Vehicle Rental System – Backend API

### **Live API URL: https://vehicle-rental-theta.vercel.app**

## **Features**

### Authentication & Authorization

1.Secure JWT login & signup

2.Two roles: admin & customer

3.Protected endpoints based on user roles

4.Token verification middleware

## **Vehicle Management**

### Admin can:

1.Add vehicles

2.Update vehicles

3.Delete vehicles

4.View all vehicles

### Customer can:

1.View all available vehicles

## **Booking Management**

### Customer:

1.Create a booking

2.View personal bookings

### Admin:

1.View all bookings

2.Manage booking status

## **User Management**

### Admin:

1.View all users

2.Update any user

3.Delete any user

### Customer:

1.Update own profile

## **Error Handling**

1.Global error handler

2..Clean and consistent API responses

3.Validation with Zod / custom rules

## **Technology Stack**

### Backend

1.Node.js

2.Express.js

3.TypeScript

4.PostgreSQL

5.pg (node-postgres)

### Security

1.JWT

2.Bcrypt password hashing

3.Role-based authentication

## **Setup**

### Clone the Repository

git clone <your-repo-url>

cd <project-folder>

### Install Dependencies

npm install

### **Configure Environment Variables**

### Create a .env file in the project root and add:

PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key

## **Start the Server**

Development Mode: npm run dev

### Production Mode:

1.npm run build

2.npm start


