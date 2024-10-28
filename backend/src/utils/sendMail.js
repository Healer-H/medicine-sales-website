require('dotenv').config()
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
const Handlebars = require('handlebars')

const sendMail = async ({ to, subject, title, message, otp, step }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST_TRASPORTER,
      port: process.env.PORT_TRASPORTER,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Mail template
    const templatePath = path.join(__dirname, './templates/email.template.html')
    const templateSource = fs.readFileSync(templatePath, 'utf8')

    // Compile template and replace placeholders with data
    const template = Handlebars.compile(templateSource)
    const html = template({
      title,
      message,
      otp,
      step: step / 60,
    })
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      html,
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(`Error sending email: ${error}`)
    return null
  }
}

module.exports = sendMail
