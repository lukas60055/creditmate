### Main Project Documentation: CreditMate

---

#### **Project Description**

CreditMate is a system designed to calculate loan installments based on provided parameters. The application's backend checks whether the loan's interest rate exceeds the reference rate. If it does, it returns a response without calculations. Otherwise, it calculates the installment value and the remaining contract balance, saving the results in the database.

---

#### **Project Structure**

- **backend/**: REST API server built with Express.js.
- **frontend/**: User interface implemented with React.js.

---

#### **Quick Start**

##### **Installation Steps**

1. Clone the repository:
   ```bash
   git clone https://github.com/lukas60055/creditmate.git
   cd creditmate
   ```
2. Navigate to the `backend` folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Navigate to the `frontend` folder and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

##### **Running in Production Mode**

1. Start both services using Docker Compose:
   ```bash
   docker-compose up --build
   ```
2. After starting:
   - The frontend is accessible on port **3000**.
   - The backend is accessible on port **3001**.

##### **Running in Development Mode**

1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```
2. Start the frontend:
   ```bash
   cd ../frontend
   npm start
   ```

---

#### **Features**

- **Backend**:

  - POST `/` endpoint for loan calculations.
  - Input validation using **Joi**.
  - Fetching the reference rate from **NBP API**.
  - Error handling with `errorHandler` and `notFound` middleware.
  - WebSocket for monitoring server connection status.

- **Frontend**:
  - User panel for entering loan parameters.
  - Input data validation.
  - Backend connection status monitoring via WebSocket.
  - Displaying error messages.

---

#### **Technologies**

- Backend:
  - Node.js, Express.js, Sequelize, MariaDB, Joi, Nodemailer.
- Frontend:
  - React.js, Bootstrap, WebSocket.

---

#### Author

**Łukasz Duda**
Website: [lukaspro.pl](https://lukaspro.pl/)
