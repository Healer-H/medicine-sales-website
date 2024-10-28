const dotenv = require('dotenv')
const Path = require('path')

let envFile =
  process.env.NODE_ENV === 'production' ? 'production.env' : 'development.env'
dotenv.config({ path: Path.resolve(__dirname, `../../env/${envFile}`) })

const EnvVars = {
  NodeEnv: process.env.NODE_ENV || '',
  Host: process.env.HOST,
  Port: process.env.PORT || 3000,
  CookieProps: {
    Key: 'ExpressGeneratorTs',
    Secret: process.env.COOKIE_SECRET || '',
    // Casing to match express cookie options
    Options: {
      httpOnly: true,
      signed: true,
      path: process.env.COOKIE_PATH || '',
      maxAge: Number(process.env.COOKIE_EXP || 0),
      domain: process.env.COOKIE_DOMAIN || '',
      secure: process.env.SECURE_COOKIE === 'true',
    },
  },
  Jwt: {
    Secret: process.env.JWT_SECRET || '',
    Exp: process.env.COOKIE_EXP || '', // exp at the same time as the cookie
  },
  Mysql: {
    ConnectionString: process.env.MYSQL_URI || '',
  },
  NodeMailer: {
    Email: process.env.NODE_MAILER_EMAIL || '',
    Password: process.env.NODE_MAILER_PASSWORD || '',
  },
  Bcrypt: {
    SaltRounds: process.env.BCRYPT_SALT_ROUNDS || '5',
  },
  Otp: {
    OtpSalt: process.env.OTP_SALT || 'taokhongbiet',
    MaxAttempts: process.env.MAX_ATTEMPTS || '10',
  },
}

module.exports = EnvVars
