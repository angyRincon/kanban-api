import { DataSource } from 'typeorm';
import 'dotenv/config'

const connection = new DataSource({
  type: 'postgres',
  port: 5432,
  host: process.env.NODE_DB_HOST,
  username: process.env.NODE_DB_USER_NAME,
  password: process.env.NODE_DB_PASSWORD,
  database: process.env.NODE_DB_NAME,
  entities: ['./src/models/*.ts'],
  migrations: ['./src/migrations/**/*.ts'],
  migrationsTableName: "migrations",
});

const connectDB = async () => {
  try {
    await connection.initialize();
    console.log('Data Source has been initialized');
  } catch (err) { 
    console.error(`Data Source initialization error: ${err}`);
  }
};

const destroyDb = () => {
  try {
    connection.destroy();
    console.log('Data Source has been closed');
  } catch (err) {
    console.error(`Data Source closing connection error: ${err}`);
  }
}

export { connection, connectDB, destroyDb };
