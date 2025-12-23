import mongoose from "mongoose";

const { MONGO_URI} = process.env

mongoose.connection.on('error', err => {
    console.log('Error de conexion', err)
})

export default function connectMonggose(){
    return mongoose.connect(MONGO_URI)
    .then( mongoose => mongoose.connection)
}