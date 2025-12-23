import mongoose, {Schema} from "mongoose";
import User from "./User.js";

const movieSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type:String, required:true} ,
    date: {type:String },
    director: {type: String},
    trailer:{type: String},
    imageCarousel:{type:String},
    imagePoster:{type:String},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    genre: [{type: mongoose.Schema.Types.ObjectId, ref : "List"}]

},{timestamps:true});


const Movie = mongoose.model('Movie', movieSchema)
export default Movie
