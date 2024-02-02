import 'dotenv/config'

export const envConfig = {
    dbName: process.env.NODE_DB_NAME,
    dbUser: process.env.NODE_DB_USER_NAME,
    dbPassword: process.env.NODE_DB_PASSWORD,
    dbHost: process.env.NODE_DB_HOST
}