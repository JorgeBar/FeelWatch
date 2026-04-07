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
  const apiKey = process.env.EMAIL_SERVICE_USER;
  const apiSecret = process.env.EMAIL_SERVICE_PASSWORD; 
  const fromEmail = process.env.EMAIL_SERVICE_FROM; 
  const fromName = process.env.EMAIL_SERVICE_FROM_NAME || "FeelWatch";
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  //const transport = await createTransport();
  //const result = await transport.sendMail({
    //from: process.env.EMAIL_SERVICE_FROM,
    //to,
    //subject,
   // html: body,
  //});
   if (!apiKey || !apiSecret || !fromEmail) {
    throw new Error("Missing Mailjet env vars (EMAIL_SERVICE_USER/PASSWORD/FROM)");
  }

   const response = await fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Messages: [
        {
          From: { Email: fromEmail, Name: fromName },
          To: [{ Email: to }],
          Subject: subject,
          HTMLPart: body,
        },
      ],
    }),
 //if (process.env.FEELWATCH_ENV === 'development') {
    //console.log(`Email simulado. Preview: ${result.messageId}`);
  //}

  //return result;
});
 const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`Mailjet send failed: ${response.status} ${JSON.stringify(data)}`);
  }

  return data;
}


export function generatePreviewURL(sendResult){
    return nodemailer.getTestMessageUrl(sendResult)
}