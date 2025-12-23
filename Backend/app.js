import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import * as homeController from './controllers/homeController.js'
import path from 'path';
import { fileURLToPath } from 'url';
import connectMonggose from './lib/connectMongoose.js';
import * as authController from './controllers/auth/authController.js'
import * as profileController from './controllers/userProfileController.js'
import * as sessionManager from './lib/sessionManager.js'
import * as MovieController from './controllers/MovieController.js'
import * as ListController from './controllers/ListController.js'
import upload from './lib/uploadConfigure.js'


await connectMonggose()
console.log('Conectado a MongoDB')

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded())

/**
 * Aplication routes
 */
app.use(sessionManager.middleware)

//Public pages
app.get('/' , homeController.index)
app.get('/auth/login', authController.Login)
app.get('/auth/register' , authController.getRegister)

app.post('/auth/login', authController.postLogin)
app.post('/auth/register' , authController.postRegister)

app.get('/lists', ListController.getLists )

//Private Pages
app.post('/lists' ,ListController.createList)
app.get('/lists/:id' , ListController.getListById)
app.put('/lists/:id' , ListController.updateList)
app.delete('/lists/:id' , ListController.deleteList)

app.get('/profile/:id' ,profileController.getProfile)
app.put('/profile/:id', profileController.updateProfile)


app.get('/lists/:id/movies' , MovieController.createMovie)
app.post('/lists/:id/movies' ,upload.fields([ 
    { name: "carousel", maxCount: 1 },
    { name: "poster", maxCount: 1 },
    { name: "avatar", maxCount: 1 }] ),
     MovieController.createMovie)
app.get('/movies/:id' , MovieController.getMovieById )
app.put('/movies/:id/edit', MovieController.updateMovie)
app.delete('/movies/:id/delete', MovieController.deleteMovie)

app.all('/auth/logout' , authController.logout)


app.use(express.static(path.join(__dirname, '../docs')));

//Posible futuro ejemplo de params
app.get('/paramsInList/lists/:listsId/movies/:movieid' , homeController.paramsInList)
//Posible futuro ejemplo de querys
app.get('/querysinlist' , homeController.querysInList)

app.post('/create-example', homeController.createExample)



app.use((err, req, res, next) => {

    // Errores del validador (express-validator)
    if (typeof err.array === 'function') {
        console.log('Validation errors:', err.array());
        return res.status(422).json({
            success: false,
            errors: err.array()
        });
    }

    // Otros errores 404 , etc
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

export default app