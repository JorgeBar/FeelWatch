import nodemailer from "nodemailer";

export async function createTransport() {
  const options = {
    service: process.env.EMAIL_SERVICE_NAME,
    host: process.env.EMAIL_SERVICE_HOST,
    port: process.env.EMAIL_SERVICE_PORT,
    secure: process.env.EMAIL_SERVICE_SECURE === 'true', // Use true for port 465, false for port 587
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASSWORD,
    },
  };

  return nodemailer.createTransport(options)
}
export async function sendEmail(to, subject, body) {
  const transport = await createTransport();
  const result = await transport.sendMail({
    from: process.env.EMAIL_SERVICE_FROM,
    to,
    subject,
    html: body,
  });

  if (process.env.FEELWATCH_ENV === 'development') {
    //console.log(`Email simulado. Preview: ${result.messageId}`);
  }

  return result;
}


export function generatePreviewURL(sendResult){
    return nodemailer.getTestMessageUrl(sendResult)
}