import 'dotenv/config';
import amqplib from "amqplib";
import { sendEmail } from "./emailManager.js";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const QUEUE_NAME = "cola-de-tareas";
//const CONSUMER_TAG = "worker_principal"; // Tag fijo para evitar zombies
const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL);
const channel = await connection.createChannel();

console.log("Consumer arrancado esperando instrucciones");

export async function startConsumer() {
  await channel.consume(QUEUE_NAME, async (message) => {
    const data = JSON.parse(message.content.toString());
    
    try {
      switch(data.type) {
        case 'email_register':
          await sendEmail(data.email, 'Bienvenido', `¡Hola ${data.username},disfruta de tu nueva experiencia!`);
          console.log('Email enviado a:', data.email);
          break;
          
        case 'resize_avatar':
          await resizeAvatar(data);
          break;
          
        case 'resize_carousel':
          await resizeCarousel(data);
          break;
          
        case 'resize_poster':
          await resizePoster(data);
          break;
      }
      
      channel.ack(message);
    } catch (error) {
      console.error('Error:', error);
      channel.nack(message);
    }
  });
}

// Función específica para avatar (pequeños, redondos)
async function resizeAvatar(data) {
  const sizes = [
    { name: 'small', width: 50 },
    { name: 'medium', width: 100 },
    { name: 'large', width: 200 }
  ];
  await processResize(data, 'AvatarUser', sizes);
}

// Función específica para carousel (grandes, panorámicos)
async function resizeCarousel(data) {
  const sizes = [
    { name: 'mobile', width: 768 },
    { name: 'tablet', width: 1024 },
    { name: 'desktop', width: 1920 }
  ];
  await processResize(data, 'photoCarousel', sizes);
}

// Función específica para poster/banner (formato banner)
async function resizePoster(data) {
  const sizes = [
    { name: 'mobile', width: 480 },
    { name: 'tablet', width: 768 },
    { name: 'desktop', width: 1200 }
  ];
  await processResize(data, 'photoPoster', sizes);
}

// Función auxiliar genérica
async function processResize(data, folder, sizes) {
  const filepath = path.join(process.cwd(), 'public', folder, data.filename);
  const outputDir = path.join(process.cwd(), 'public', folder, 'resized');
  
  const buffer = fs.readFileSync(filepath);
  
  for (const size of sizes) {
    const resized = await sharp(buffer)
      .resize(size.width, null, { fit: 'cover' })  // Mantiene proporción
      .jpeg({ quality: 80 })
      .toBuffer();
      
    fs.writeFileSync(path.join(outputDir, `${size.name}-${data.filename}`), resized);
  }
  
  console.log(`Resize ${folder} completado:`, data.filename);
}
startConsumer().catch(err => console.error('Error arrancando consumer:', err));
