import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import { sendEmail as sendEmailLib } from '../lib/emailManager.js';


const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required:true, unique :true},
    password: {type:String ,required: true},
    listsCreated: [{type: mongoose.Schema.Types.ObjectId, ref : "List"}]

},{timestamps:true});

userSchema.statics.hashPassword = function(clearPassword){ 
    return bcrypt.hash(clearPassword, 7)

}
// método de instancia, comprueba que la pssword coincide
userSchema.methods.comparePassword = function(clearPassword){
    return bcrypt.compare(clearPassword, this.password)
}
userSchema.methods.sendEmail = async function(subject, body){
    
    await sendEmailLib(this.email,subject,body)
    console.log(`Email enviado a usuario: ${this.username} (${this.email})`);
}

const User = mongoose.model('User', userSchema)
export default User
