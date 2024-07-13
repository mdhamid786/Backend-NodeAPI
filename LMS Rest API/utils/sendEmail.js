const nodeMailer = require("nodemailer");
const asyncHandler = require("express-async-handler")

exports.sendEmail = asyncHandler(async (data,req, res)=>{
  const transporter = nodeMailer.createTransport({
    host:  process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.SMPT_SERVICE, // sender address
      to: data.email, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.htm, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  
  main().catch(console.error);
})