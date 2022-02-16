require('dotenv').config()

export const env = {
    DATABASE_NAME: process.env.DATABASE_NAME,
    MONGODB_URL: process.env.MONGODB_URL,
    APP_HOST: process.env.APP_HOST,
    APP_POST: process.env.APP_POST,
}
