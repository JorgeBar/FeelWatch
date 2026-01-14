import 'dotenv/config'
import readline from 'node:readline'
import connectMonggose from "./lib/connectMongoose.js";
import User from "./models/User.js";
import Movie from './models/movie.js'
import List from './models/list.js';


const connection = await connectMonggose()
console.log('Connected to MongoDB:', connection.name)

const questionResposne = await ask('Are you su you want to empty the database and create initial data?')
if (questionResposne.toLowerCase() !== 'yes'){
    console.log('Operation aborted. ')
    process.exit()
}

const users = await initUsers()
const movies = await initMovies()
await initLists(users,movies)



async function initUsers() {
    const deleteResult = await User.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} users`)
    

    const insertResult = await User.insertMany([
        {username: 'JorgeVB1', email : 'jorge@gmail.com', password: await User.hashPassword('123456')},
        {username: 'JorgeVB2', email : 'jorge2@gmail.com' ,password: await User.hashPassword('123456')},
        {username: 'JorgeVB3', email : 'gorka6493@gmail.com' , password: await User.hashPassword('123456')},
    ])
    console.log(`Created ${insertResult.length} users.`)
    return insertResult

}

async function initMovies(){
    const deleteResult = await Movie.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} movies`)

    const insertResult = await Movie.insertMany([
       {name: 'Matrix',
        description:'Película de ciencia ficción con un gran aspecto psicológico existencialista.',
        director: 'Wachowski brothers',
       
        },
         {
        name: 'Inception',
        description: 'Un ladrón especializado en sueños roba secretos del subconsciente.',
        director: 'Christopher Nolan',

    },
    {
        name: 'Interstellar',
        description: 'Exploración espacial para salvar a la humanidad en un futuro cercano.',
        director: 'Christopher Nolan',

    },
    {
        name: 'The Godfather',
        description: 'Historia épica sobre la familia criminal Corleone.',
        director: 'Francis Ford Coppola',

    },
    {
        name: 'Pulp Fiction',
        description: 'Historias entrelazadas de crimen y redención en Los Ángeles.',
        director: 'Quentin Tarantino',

    },
    {
        name: 'The Dark Knight',
        description: 'Batman lucha contra el caos y el Joker en Gotham City.',
        director: 'Christopher Nolan',

    }
    ])

   insertResult.forEach(movie => console.log(`Created movie ${movie.name}, _id: ${movie._id}`));
    return insertResult

}
async function initLists(users, movies){
    const deleteResult = await List.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} lists`)

 
    const findingInfanciaMovies = [
        movies.find(m => m.name === 'Matrix')._id,
        movies.find(m => m.name === 'Inception')._id,
        movies.find(m => m.name === 'Interstellar')._id
    ]

    const findingNostalgiaMovies = [
        movies.find(m => m.name === 'The Godfather')._id,
        movies.find(m => m.name === 'Pulp Fiction')._id,
        movies.find(m => m.name === 'The Dark Knight')._id
    ]

    const insertResult = await List.insertMany([
        {
            name: 'Infancia',
            description: 'Películas que marcaron la infancia',
            owner: users[0]._id,
            movies: findingInfanciaMovies
        },
        {
            name: 'Nostalgia',
            description: 'Películas para recordar',
            owner: users[1]._id,
            movies: findingNostalgiaMovies
        }
    ])

    insertResult.forEach(list => console.log(`Created list ${list.name}, _id: ${list._id}`));
}

function ask(questionText){
    return new Promise((resolve , reject) =>{
        const consoleInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        consoleInterface.question(questionText, answer =>{
            consoleInterface.close()
            resolve(answer)
        })
    })
}