import mongoose, {Schema} from "mongoose";
import User from "./User.js";
import Movie from "./movie.js"

const listSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type:String, required:true} ,
    date: {type:String },
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    movies: [{type: mongoose.Schema.Types.ObjectId, ref : "Movie"}]

},{timestamps:true});

// se supone que es para el limit de listas por ejemplo
listSchema.statics.pagin = function(filter,limit, skip,sort){
    const query = List.find(filter)
    query.limit(limit)
    query.skip(skip)
    return query.exec()
}


const List = mongoose.model('List', listSchema)
export default List
