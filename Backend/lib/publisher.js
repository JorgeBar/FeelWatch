import amqplib from 'amqplib'

const EXCHANGE_NAME='peticiones-de-tareas'

let channel;
// conectar con el broker de RabbitMQ
export async function connectRabbit(){
    const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL)
    //crear un canal
     channel = await connection.createChannel();
    // crear un exchange
    await channel.assertExchange(EXCHANGE_NAME, 'direct', {
        durable : true //the exchange will survive broker restarts --> persistence
    })
}

// publicar un mensaje 
export async function publishEmailRegister(user){
    const messageRegister = {
       type: 'email_register',
       email: user.email,
       username: user.username
    }
    console.log('Publicando email:', messageRegister)
    channel.publish(EXCHANGE_NAME, '*', Buffer.from(JSON.stringify(messageRegister)))

}

export function publishResizeAvatar(userId, filename){

    const resizeAvatar = {
        type: 'resize_avatar',
        userId,
        filename
    }
    channel.publish(EXCHANGE_NAME, '*', Buffer.from(JSON.stringify(resizeAvatar)))

}

export function publishResizePoster(userId,filename){

    const resizePoster = {
        type: 'resize_poster',
        userId,
        filename
    
    }
    channel.publish(EXCHANGE_NAME, '*', Buffer.from(JSON.stringify(resizePoster)))

}
export function publishResizeCarousel(userId,filename){

    const resizeCarousel = {
        type: 'resize_carousel',
        userId,
        filename
    
    }
    channel.publish(EXCHANGE_NAME, '*', Buffer.from(JSON.stringify(resizeCarousel)))
}




