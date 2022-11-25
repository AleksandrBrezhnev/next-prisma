module.exports = {
    development: {
        port: 3000,
        timezone: "Europe/Moscow",
        aws: {
            AWS_ACCESS_KEY: "access key id for aws",
            AWS_SECRET_ACCESS_KEY: "secret access key for aws",
            BUCKET_NAME: "name of the bucket"
        },
        db: {
            username: "postgres",
            password: "password",
            database: "ikkfu_database",
            host: "127.0.0.1",
            port: 5432,
            dialect: "postgres",
            logging: false
        },
        token: {
            secret: "Enter your secret here",
            accessExpires: 86400,
            refreshExpires: 604800
        },
        hash: {
            type: "md5",
            key: "Enter your key here"
        },
        urls: {
            current: "http://localhost:4000",
            dev: "http://3.141.39.130",
            staging: "https://staging.ikkfoo.com"
        },
        email: {
            EMAIL_AMOUNT: 10,
            API_KEY: "Enter SendGrid api key here"
        },
        image: {
            maxSize: 3100000,
            quality: 70,
            quantity: 5
        }
    }
}