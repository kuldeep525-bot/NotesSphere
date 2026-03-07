// import nodemailer from "nodemailer";

// export const sendEmail = async ({ to, subject, text }) => {
//   //Transporter = postman , yeh decide karta hai konse email server or kaise authentication
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com", //gmail ka smtp server
//     port: 465, //secure (ssl)
//     secure: true, //SSL encryption ON, Data safe rahta hai
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS, //yeh gmail password hai
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text,
//   });
// };

//resend mail uses

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text }) => {
  await resend.emails.send({
    from: "NotesSphere <onboarding@resend.dev>",
    to,
    subject,
    text,
  });
};
