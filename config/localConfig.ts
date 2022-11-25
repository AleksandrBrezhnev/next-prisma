module.exports = {
  development: {
    port: +process.env.BACKEND_PORT,
    timezone: "Europe/Moscow",
    aws: {
      AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      BUCKET_NAME: process.env.AWS_BUCKET_NAME
    },
    db: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: +process.env.DB_PORT,
      host: process.env.POSTGRES_HOST,
      dialect: "postgres",
      logging: false
    },
    token: {
      secret: process.env.TOKEN_SECRET,
      accessExpires: +process.env.TOKEN_ACCESS_EXPIRES,
      refreshExpires: +process.env.TOKEN_REFRESH_EXPIRES
    },
    hash: {
      type: "md5",
      key: process.env.HASH_KEY
    },
    urls: {
      current: "http://localhost:3000",
      dev: "http://3.141.39.130",
      staging: "https://staging.ikkfoo.com"
    },
    email: {
      EMAIL_AMOUNT: 10,
      API_KEY: process.env.EMAIL_API_KEY
    },
    socket: {
      CALLBACK_URL: "http://localhost:3000/",
      CALLBACK_OBJECTS: { prosemirror: "XmlFragment" }
    },
    recommender: {
      TIME_TO_LIVE: 604800
    },
    typesense: {
      api_key: process.env.TYPESENSE_API_KEY
    }
  }
}