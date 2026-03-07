import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  //Transporter = postman , yeh decide karta hai konse email server or kaise authentication
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //gmail ka smtp server
    port: 587, //secure (ssl)
    secure: false, //SSL encryption ON, Data safe rahta hai
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, //yeh gmail password hai
    },
  });

  await transporter.verify();
  console.log("SMTP connected");
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};
