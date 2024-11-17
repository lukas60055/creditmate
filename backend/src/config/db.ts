import { Sequelize } from 'sequelize';

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
  throw new Error(
    'Missing required environment variables for database connection'
  );
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    logging: process.env.NODE_ENV !== 'production' ? true : false,
  }
);

export const connectDb = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Connected to the MariaDB database via Sequelize.');
      break;
    } catch (error) {
      console.error('Database connection error:', error);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      if (!retries) process.exit(1);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

export default sequelize;
