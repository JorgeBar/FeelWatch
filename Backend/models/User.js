import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import { clear } from "console";

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

const User = mongoose.model('User', userSchema)
export default User
