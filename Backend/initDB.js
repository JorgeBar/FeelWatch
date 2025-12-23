import readline from 'node:readline'
import connectMonggose from "./lib/connectMongoose.js";
import User from "./models/User.js";

const connection = await connectMonggose()
console.log('Connected to MongoDB:', connection.name)

const questionResposne = await ask('Are you su you want to empty the database and create initial data?')
if (questionResposne.toLowerCase() !== 'yes'){
    console.log('Operation aborted. ')
    process.exit()
}

await initUsers()




async function initUsers() {
    const deleteResult = await User.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} users`)
    

    const insertResult = await User.insertMany([
        {username: 'JorgeVB1', email : 'jorge@gmail.com', password: await User.hashPassword('1234')},
        {username: 'JorgeVB2', email : 'jorge2@gmail.com' ,password: await User.hashPassword('1234')},
        {username: 'JorgeVB3', email : 'jorge3@gmail.com' , password: await User.hashPassword('1234')},
    ])
    console.log(`Created ${insertResult.length} users.`)
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