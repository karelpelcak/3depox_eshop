import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: Number(process.env.SMTP_PORT), 
  secure: true, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, 
  },
});

export async function post(request: any) {
  const { to, subject, text } = request.body;
  console.log(transporter)
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_PASS,
      to, 
      subject, 
      text, 
    });

    console.log('Message sent: %s', info.messageId);
    return {
      status: 200,
      body: { message: 'Email sent successfully' },
    };
  } catch (err) {
    console.error('Error occurred while sending email:', err);
    return {
      status: 500,
      body: { error: 'Failed to send email' },
    };
  }
}
