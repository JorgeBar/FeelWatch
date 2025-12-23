import mongoose, {Schema} from "mongoose";
import User from "./User.js";
import Movie from "./movie.js"

const listSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type:String, required:true} ,
    date: {type:String },
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    list: [{type: mongoose.Schema.Types.ObjectId, ref : "Movie"}]

},{timestamps:true});


const List = mongoose.model('List', listSchema)
export default List
