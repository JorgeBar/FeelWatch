import sgMail from '@sendgrid/mail';

export async function sendEmail(to, subject, body) {
  sgMail.setApiKey(process.env.EMAIL_SERVICE_PASSWORD);
  
  const msg = {
    to: to,
    from: process.env.EMAIL_SERVICE_FROM, 
    subject: subject,
    html: body,
  };

  try {
    const [response] = await sgMail.send(msg);
    return response;
  } catch (error) {
    console.error("Error enviando con SendGrid API:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw error;
  }
}


export async function createTransport() {
  return null; 
}