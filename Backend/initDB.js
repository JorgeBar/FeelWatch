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
    try {
        const deleteResult = await User.deleteMany()
        console.log(`Deleted ${deleteResult.deletedCount} users`)
        
    
        const insertResult = await User.insertMany([
            {username: 'TesterOne', email : 'tester1feelwatch@gmail.com', password: await User.hashPassword('123456')},
            {username: 'TesterTwo', email : 'tester2feelwatch@gmail.com' ,password: await User.hashPassword('123456')}
           

         
        ])
        console.log(`Created ${insertResult.length} users.`)
        return insertResult
        
    } catch (error) {
         console.error('Error en initUsers:', error)
            throw error
    }

}

async function initMovies(){
    const deleteResult = await Movie.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} movies`)

    const insertResult = await Movie.insertMany([
       {name: 'The Matrix',
        description:"Another gem my brother introduced me to. The more I've grown, the more I've appreciated it - the incredible dystopian world, the amazing aesthetic, the great actors. A philosophical critique against capitalism and the slavery that will live forever due to human nature. It will always be contemporary and relevant. The question 'what is real?' becomes more important every day in our digital age. Plus, the action sequences still hold up perfectly - that lobby scene is cinema history.",
        director: 'Wachowski brothers',
        synopsis:"A computer hacker discovers that reality as he knows it is actually a simulated world created by machines. He joins a rebellion to fight against the artificial intelligence controlling humanity and free people from their digital prison.",
        date:1999,
        imageCarousel:"/fotosinitDB/TheMatrix.webp",
        imagePoster:"",
        trailer:"https://www.youtube.com/watch?v=m8e-FF8MsqU"

       
        },
         {
        name: 'Hook',
        description:"A precious movie from my childhood. My mother read me Peter Pan stories, I loved the animated films, and this one was brilliant. Now as an adult, I always cry at the final scene: 'To live would be an awfully big adventure.' The idea of growing up and forgetting who you were, then finding that magic again, resonates so much more now. Robin Williams brought such warmth and heart to a character struggling between responsibility and wonder. It's a beautiful reminder that we all need to hold onto our inner child.",
        director: 'Steven Spierlberg',
        synopsis:"Peter Pan has grown up into Peter Banning, a workaholic lawyer who has forgotten his past. When Captain Hook kidnaps his children, he must return to Neverland and remember how to be Peter Pan again to save them and rediscover his inner child.",
        date:1991,
        imageCarousel:"/fotosinitDB/Hook.webp",
        imagePoster:"",
        trailer:"https://www.youtube.com/watch?v=c-vwgt8cwEM"
        

    },
    {
        name: 'Interstellar',
        description:"Everyone agrees - it's incredible. The music, the performances, everything. When the protagonist regrets leaving his children halfway through in that iconic crying scene, I always cry too. An absolute masterpiece. The way it explores love as a dimension that transcends time and space is both scientifically fascinating and emotionally devastating. Hans Zimmer's organ music paired with those vast cosmic visuals creates something truly transcendent. It makes you think about sacrifice, time, and what we leave behind.",
        director: 'Christopher Nolan',
        synopsis:"In a dying Earth's future, a group of astronauts travels through a wormhole near Saturn to find a new habitable planet for humanity. A former pilot must leave his family behind on a desperate mission that challenges our understanding of love, time, and sacrifice.",
        date:2014,
        imageCarousel:"/fotosinitDB/Interstellar.webp",
        imagePoster:'',
        trailer:"https://www.youtube.com/watch?v=2LqzF5WauAw"

    },
    {
        name: 'The Felloship of the Ring',
        description:"This movie defined my childhood. My brother showed it to me on a pirated download and it became a huge part of my life ever since. The epicness, the fantasy world, the incredible soundtrack, the breathtaking landscapes - everything about Middle-earth captivated me. I would genuinely live there if I could. The way it builds this massive universe full of different cultures, languages, and histories made me fall completely in love with Tolkien's world. It's not just a movie to me, it's a whole experience that shaped who I am.",
        director: 'Peter Jackson',
        synopsis:"A young hobbit inherits a powerful ring that could destroy the world if it falls into evil hands. He embarks on an epic journey with a fellowship of different races to destroy the ring in the fires of Mount Doom before darkness consumes Middle-earth.",
        date:2001,
        imageCarousel:"/fotosinitDB/TheFeloshipOfTheRing.webp",
        imagePoster:"",
        trailer:"https://www.youtube.com/watch?v=V75dMMIW2B4"

    },
    {
        name: 'About Time',
        description:"Even hearing the trailer makes me emotional. While the protagonist's obsession with one girl might have a toxic reading, the relationships with his sister, his father, and eventually his own family are beautiful. The father-son relationship especially breaks my heart, having lost my own dad when I was young. Those beach scenes, those conversations about life and time - they hit differently when you've experienced that loss. It reminds me to cherish every ordinary moment because those are actually the extraordinary ones.",
        director: 'Richard Curtis',
        synopsis: "A young man discovers he can travel through time and uses this ability to improve his love life. However, he learns that even with time travel, he cannot escape life's inevitable challenges and losses. A heartwarming story about cherishing everyday moments with the people we love.",
        date:2013,
        imageCarousel:"/fotosinitDB/AboutTime.webp",
        imagePoster:"",
        trailer:"https://www.youtube.com/watch?v=7OIFdWk83no&t=8s"
        

    },
    {
        name: 'Da Vinci Code',
        description:"A fantastic adventure film. Growing up in a Catholic school combined with my natural curiosity made me fall in love with this movie. The hypocrisy, the knowledge, the great actors, the variety of locations, the music - everything works perfectly together. It challenged everything I was taught while making me appreciate art and history in a completely new way. The mystery unfolds like a puzzle where each clue reveals something bigger about faith, power, and hidden truths. Tom Hanks and Audrey Tautou have perfect chemistry racing through Paris and beyond.",
        director: 'Ron Howard',
        synopsis:"A murder at the Louvre Museum leads a symbologist and a cryptologist to uncover a conspiracy involving secret societies, religious history, and hidden messages in famous artworks. Their investigation reveals shocking truths that could shake the foundations of Christianity.",
        date:2006,
        imageCarousel:"/fotosinitDB/DaV‌inciCode.webp",
        imagePoster:"",
        trailer:"https://www.youtube.com/watch?v=lfqHb6INj3w"
    }
    ])

   insertResult.forEach(movie => console.log(`Created movie ${movie.name}, _id: ${movie._id}`));
    return insertResult

}
async function initLists(users, movies){
    const deleteResult = await List.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} lists`)

 
    const findingLastTearsMovies = [
        movies.find(m => m.name === 'About Time')._id,
        movies.find(m => m.name === 'Hook')._id,
        movies.find(m => m.name === 'Interstellar')._id
    ]

    const findingAlwaysReadyToWatchMovies = [
        movies.find(m => m.name === 'The Matrix')._id,
        movies.find(m => m.name === 'The Felloship of the Ring')._id,
        movies.find(m => m.name === 'Da Vinci Code')._id
    ]

    const insertResult = await List.insertMany([
        {
            name: 'Demo List 1  "Last Tears"',
            description: 'Last movies that made my cry',
            owner: users[0]._id,
            tags:["Alive", "Regrets"],
            movies: findingLastTearsMovies
        },
        {
            name: 'Demo List 2 "Always ready for it"',
            description: 'Movies that i can watch thousends of times',
            owner: users[1]._id,
            tags:["Happy", "Childhood"],
            movies: findingAlwaysReadyToWatchMovies
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