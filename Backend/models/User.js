import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import * as emailManager from '../lib/emailManager.js'

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
    const transport = await emailManager.createTransport()
    console.log(`Sending email to ${this.email}...`)
    const result = await transport.sendMail({
        from: process.env.EMAIL_SERVICE_FROM,
        to: this.email,
        subject,
        html:body
    })
    if(process.env.FEELWATCH_ENV === 'development'){
        console.log(`Email simulated. Preview ${emailManager.generatePreviewURL(result)}`)
    }
}

const User = mongoose.model('User', userSchema)
export default User
