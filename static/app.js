import nodemailer from 'nodemailer';

async function main() {
  let transporter = nodemailer.createTransport({
    host: 'smtp.seznam.cz',
    port: 465,
    secure: true,
    auth: {
      user: 'registrace@3depox.cz',
      pass: 'Kaja172004',
    },
  });

  let info = await transporter.sendMail({
    from: '"You" <registrace@3depox.cz>',
    to: 'gryvdycz@gmail.com',
    subject: 'Úspěšná registrace',
    html: `
      <h1>Hello there</h1>
      <p>Isn't NodeMailer useful?</p>
    `,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
