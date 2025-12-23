import mongoose from "mongoose";

mongoose.connection.on('error', err => {
    console.log('Error de conexion', err)
})

export default function connectMonggose(){
    return mongoose.connect('mongodb://127.0.0.1:27017/FeelWatch')
}