import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { EmailFormData } from "@/types/interfaces"
import smtpTransport  from 'nodemailer-smtp-transport';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { formField1, formField2 } = req.body as EmailFormData;

  const transporter = nodemailer.createTransport(smtpTransport({
    host: process.env.MAIL_AUTH_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    },
  
  }));

  const mailOptions = {
    from: process.env.MAIL_AUTH_SENDER,
    to: "fabriciorm40@hotmail.com",
    subject: 'Email de Teste da TXAI DIGITAL',
    html: "<b>Você recebeu um email de teste da futura nova ferramenta da TXAI DIGITAL!</b>",
};

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Email sending failed' });
  }
}