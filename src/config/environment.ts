import { config } from 'dotenv'

const values = process.env.NODE_ENV === 'development' ? config({ path: '.env.local' }) : config({ path: '.env.production' })

export const envConfig = {
    dbName: values.parsed.NODE_DB_NAME,
    dbUser: values.parsed.NODE_DB_USER_NAME,
    dbPassword: values.parsed.NODE_DB_PASSWORD,
    dbHost: values.parsed.NODE_DB_HOST,
    apiUrl: values.parsed.NODE_API_URL
}