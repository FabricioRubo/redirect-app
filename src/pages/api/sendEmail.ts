import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { EmailFormData, QuestionForm } from "@/types/interfaces"
import smtpTransport  from 'nodemailer-smtp-transport';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { questions, answers } = req.body as EmailFormData;
  let HTMLtext = ""

  const mailContentBuilder = (questions:QuestionForm[], answers:string[]) => {
    questions.map((question:QuestionForm, index) => {
      HTMLtext = HTMLtext +"<div><h4>" + (index+1).toString() + ". " + question.quest.toString() + "</h4><h3>" + answers[index].toString() + "</h3><hr></div>"
    })
  }

  mailContentBuilder(questions, answers)

  const transporter = nodemailer.createTransport(smtpTransport({
    host: process.env.MAIL_AUTH_HOST,
    port: Number(process.env.MAIL_AUTH_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    },
  }));

  const mailOptions = {
    from: process.env.MAIL_AUTH_SENDER,
    to: process.env.MAIL_AUTH_RECIPIENTS,
    subject: `[TXAI] Novo Lead | ${answers[0]} preencheu o formulário de qualificação`,
    html: `
      <html>
        <head>
          <meta charset='UTF-8'>
          <title>LEAD NOVA PRA TXAI</title>
          <style>
            * {
              font-family: 'Arial';
            }
            h1 {
              color: #F19552;
            }
            h5 {
              color: #F19552;
            }
            h4 {
              color: #D9402B;
            }
            hr {
              border: none;
              border-top: 1px solid black;
              margin: 10px 0;
            }
            .container {
              border: 2px solid #45A3A8;
              padding: 20px;
              
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #888888;
            }
            @media only screen and (max-width: 600px) {
              table[class="container"] {
                width: 100% !important;
              }
            }
          </style>
        </head>
        <body>
          <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
            <tr>
              <td>
                <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="container">
                  <tr>
                    <td align="center" style="padding: 20px 0;">
                      <h1 style="margin: 0;">LEAD SAINDO DO FORNO!</h1>
                      <h5 style="margin: 0;">Captamos uma nova Lead pra TXAI</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      ${HTMLtext}
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="footer">
                      <p>Powered by TXAI DIGITAL</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Email sending failed' });
  }
}