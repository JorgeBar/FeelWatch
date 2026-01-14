import express from 'express'
import i18n  from './lib/i18nConfigure.js'
import cookieParser from 'cookie-parser'
import createError from 'http-errors'
import logger from 'morgan'
import * as homeController from './controllers/homeController.js'
import path from 'node:path';
import connectMonggose from './lib/connectMongoose.js';
import * as authController from './controllers/auth/authController.js'
import * as profileController from './controllers/userProfileController.js'
import * as MovieController from './controllers/MovieController.js'
import * as ListController from './controllers/ListController.js'
import * as langController from './controllers/langController.js'
import upload from './lib/uploadConfigure.js'
import * as jwtAuth from './lib/jwtAuthMiddleware.js'
import * as swaggerUI from './lib/swaggerMiddleware.js'



await connectMonggose()
console.log('Conectado a MongoDB')

const app = express()
const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, '../docs')));

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

/**
 * Aplication routes
 */
app.use(i18n.init)
app.use((req, res, next) => {
  const lang = req.cookies['feelwatch-locale'] || 'en';
  req.setLocale(lang);
  next();
});
//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specification))


app.get('/change-locale/:locale', langController.changeLocale)

//Public pages
app.get('/' , homeController.index)
app.get('/auth/login', authController.Login)
app.get('/auth/register' , authController.getRegister)

app.post('/auth/login', authController.postLogin)
app.post('/auth/register' , authController.postRegister)

app.get('/lists', ListController.getLists )
app.get('/lists/:id' , ListController.getListById)


//Private Pages
app.get('/lists/create',jwtAuth.guard, ListController.getCreateList )
app.post('/lists' , jwtAuth.guard, ListController.createList)
app.put('/lists/:id' ,jwtAuth.guard, ListController.updateList)
app.delete('/lists/:id' ,jwtAuth.guard, ListController.deleteList)

app.get('/profile/:id' ,jwtAuth.guard,profileController.getProfile)
app.put('/profile/:id',jwtAuth.guard,  profileController.updateProfile)
app.delete('/profile/:id', jwtAuth.guard, profileController.DeleteAccount)


app.get('/lists/:id/movies/create' ,jwtAuth.guard, MovieController.getCreateMovie)
app.post('/lists/:id/movies' ,jwtAuth.guard,upload.fields([ 
    { name: "carousel", maxCount: 1 },
    { name: "poster", maxCount: 1 },
    { name: "avatar", maxCount: 1 }] ),
     MovieController.createMovie)
app.get('/movies/:id' , MovieController.getMovieById )
app.put('/lists/:id/movies/:movieId',jwtAuth.guard, MovieController.updateMovie)
app.delete('/lists/:id/movies/:movieId',jwtAuth.guard, MovieController.deleteMovie)

app.all('/auth/logout' ,jwtAuth.guard, authController.logout)



//Posible futuro ejemplo de params
app.get('/paramsInList/lists/:listsId/movies/:movieid' , homeController.paramsInList)
//Posible futuro ejemplo de querys
app.get('/querysinlist' , homeController.filters)

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