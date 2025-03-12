import User from "@/models/userModel";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';


export const sendEmail = async({email,emailType,userId}:any) =>{
    try {
      //confiure mail for usage

      const hashedToken = uuidv4();
      

      if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,
          {
            $set:{
              verifyToken:hashedToken,
              verifyTokenExpiry:Date.now() +3600000
            }
          })
      }else if(emailType ==="RESET"){
        await User.findByIdAndUpdate(userId,
          {
            $set:{
              forgetPasswordToken:hashedToken,
              forgetPasswordTokenExpiry:Date.now() +3600000
            }
          });
      }
        // Looking to send emails in production? Check out our Email API/SMTP product!
          const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST_URI,
            port: Number(process.env.EMAIL_PORT),
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });


          const mailOptions = {
            from: process.env.EMAIL_USER, // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your Password", // Subject line
            // text: "Hello world?", // plain text body
            html: `<p> Click <a href = "${process.env.DOMAIN}verifyemail?token=${hashedToken}">here</a> to ${
              emailType ==="VERIFY" ? "verify your email" : "reset your password"} 
              or copy and paste the link below in your browser.
              <br> ${process.env.DOMAIN}verifyemail?token=${hashedToken}
            </p>`
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse

    } catch (error:any) {
        throw new Error (error.message)
    }
}