### Backend Documentation

#### **Backend Description**

The REST API server handles loan installment calculations. It communicates with the **MariaDB** database and validates input data using **Joi**. Additionally, the server supports email sending, HTTP security, and database synchronization during startup.

---

#### **Starting the Server**

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run in development mode**:
   ```bash
   npm run dev
   ```
3. **Run in production mode**:
   ```bash
   npm run build
   npm start
   ```

During server startup, **database synchronization** is performed using the **Sequelize** ORM.

---

#### **API Endpoints**

- **POST `/`**
  - **Body**:
    - `totalInstallments`: an integer greater than 0.
    - `remainingInstallments`: an integer greater than 0, less than or equal to `totalInstallments`.
    - `installmentAmount`: a positive number with up to two decimal places.
    - `financingAmount`: a positive number with up to two decimal places.
    - `interestRate`: a positive number with up to two decimal places.
  - **Response** (depending on conditions):
    - Interest rate greater than the reference rate:
      ```json
      {
        "message": "Oprocentowanie jest większe od wartości stopy referencyjnej."
      }
      ```
    - Interest rate less than or equal to the reference rate:
      - If the new installment value is greater than zero:
        ```json
        {
          "remainingContractValue": "<value>",
          "newInstallmentAmount": "<value>"
        }
        ```

---

#### **Additional Server Operations**

1. **Saving Results to the Database**:

   - Calculation details, such as the number of installments, loan values, and new installment values, are stored in the **MariaDB** database.

2. **Email Sending**:

   - If the new installment value is less than or equal to zero, the server sends an email with the message: "Wartość nowej raty jest mniejsza lub równa zero.'"

3. **Monitoring Server Connection**:

   - The server uses **WebSocket** to monitor and verify the connection with the frontend application.

4. **Security**:
   - The server uses the **Helmet** middleware to enhance application security by setting appropriate HTTP headers.

---

#### **Error Handling**

- The `errorHandler` middleware handles server errors.
- The `notFound` middleware handles cases where the requested resource does not exist.

---

#### **Technologies**

- **Express.js**: Framework for building APIs.
- **Sequelize**: ORM for managing the MariaDB database and synchronizing the data structure during server startup.
- **Joi**: Input data validation.
- **WebSocket**: Monitors server connection with the frontend application.
- **Helmet**: Middleware that enhances application security by setting HTTP headers.
- **Nodemailer**: Handles email sending based on specific conditions.

---
