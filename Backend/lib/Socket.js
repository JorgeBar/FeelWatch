import {Server} from 'socket.io'

export function setupSocket(httpServer){
    const io = new Server(httpServer)

    io.on('connection', socket => {
        console.log('Nueva conexión de un cliente con id', socket.id)

        socket.on('movie-coment', coment =>{
           io.emit('movie-coment', coment) 
        })
    })
}