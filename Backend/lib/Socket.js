import {Server} from 'socket.io'
//aqui el profesor importa session manager para sus vistas, No se si nosotros qui necesitamos el JWT

export function setupSocket(httpServer){
    const io = new Server(httpServer)
//aqui el pone io.engine.use(sessionMannager...) No se que tendremos que poner nostros, hay que mirar tutorial
    io.on('connection', socket => {
        //ante cada conexión de un cliente
        console.log('Nueva conexión de un cliente con id', socket.id)

        socket.on('movie-coment', coment =>{
           io.emit('movie-coment', coment) 
        })
    })
}



// recordar que lo que está usando el profesor son para salas de chat 