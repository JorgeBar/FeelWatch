import session from "express-session";
import MongoStore from 'connect-mongo'

const INACTIVITY_EXPIRATION_3_DAYS = 1000 * 60 * 60 * 24 * 3
//middleware para gestionar sessiones
const { MONGO_URI, SESSION_SECRET} = process.env


export const middleware = session({
    name: 'FeelWatch-session',
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: INACTIVITY_EXPIRATION_3_DAYS },
    store: MongoStore.create({mongoUrl: MONGO_URI})
})

/* 
Esto lo usabamos para ejs.

*/