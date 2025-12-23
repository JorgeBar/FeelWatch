import session from "express-session";
import MongoStore from 'connect-mongo'

const INACTIVITY_EXPIRATION_3_DAYS = 1000 * 60 * 60 * 24 * 3
//middleware para gestionar sessiones

export const middleware = session({
    name: 'FeelWatch-session',
    secret: 'kh35YLEmsGwVjP6BJMCb2zyTgRH4da',
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: INACTIVITY_EXPIRATION_3_DAYS },
    store: MongoStore.create({mongoUrl: 'mongodb://127.0.0.1:27017/FeelWatch'})
})

/* 
Para poca concurrencia guardamos la sesion del user en MongoDB con la libería connetc-mongo Las sessiones requieren que haya comunicacion constante entre servidor y base de datos.
Si hay mediana concurrencia usamos Redis 
Si hay mucha concurrencia usamos JWT  Solo hay comunicacion entre servidor y bd cuando haces login. El resto del tiempo podemos hacer peticiones a urls solo con el jwt
Ahorrando por tanto la tarea de la comunicación la bd cconstante*/