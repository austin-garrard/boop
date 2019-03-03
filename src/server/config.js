const env = process.env.NODE_ENV || 'development'

const config = {
  development: {
    db: {
      host: 'localhost',
      port: 5432,
      user: 'dev',
      database: 'dev',
      password: 'secure',
      ssl: false,
    },
    adminDb: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      database: 'postgres',
      password: null,
      ssl: false,
    },
  },
  test: {
    db: {
      host: 'localhost',
      port: 5432,
      user: 'test',
      database: 'test',
      password: 'secure',
      ssl: false,
    },
    adminDb: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      database: 'postgres',
      password: null,
      ssl: false,
    },
  },
}

export default config[env]
