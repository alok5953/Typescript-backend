const APP_CONFIG = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT || '5432'),
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.PORT,
    ENV: process.env.ENV || 'development',
}

export default APP_CONFIG