import { DataSource } from 'typeorm';
import 'dotenv/config'
import { envConfig } from './config/environment';

const { dbUser, dbPassword, dbHost, dbName } = envConfig

const DATABASE_URL = `postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`

const connectionLocal = new DataSource({
  type: 'postgres',
  port: 5432,
  host: dbHost,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  entities: ['./src/models/*.ts'],
  migrations: ['./src/migrations/**/*.ts'],
  migrationsTableName: "migrations",
});


const connectionProd = new DataSource({
  type: 'postgres',
  port: 5432,
  url: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['./src/models/*.ts'],
  migrations: ['./src/migrations/**/*.ts'],
  migrationsTableName: "migrations",
});

const connection = process.env.NODE_ENV === 'development' ? connectionLocal : connectionProd

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
