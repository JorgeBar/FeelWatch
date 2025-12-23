import User from '../../models/User.js'
import {body , validationResult} from 'express-validator'

export function Login (req, res , next){

   next()// res.json({message: "Ruta de login activa"});
}

export async function postLogin(req, res , next){

    try {
        const {email , password} = req.body
    
        //buscar el usuario en la base de datos
        const user = await User.findOne({email: email.toLowerCase()})
        //si no lo encuentro, o la contraseña no coincide --> eerror
        if(!user || !(await user.comparePassword(password)) ){
            return
        }
        // si el usuario existe y la contraseña coincide --> apuntar en sus sesión que está logueado
        req.session.userId = user._id
        req.session.userEmail = user.email
        res.json({message: "Login correcto", userId: user._id})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno al hacer login" });
    }
}

export function logout(req,res,next){
    req.session.regenerate(err => {
        if(err) return next(err)
        res.json({ message: "Logout correcto" }); 
    })
}
export function getRegister(req,res,next){
    next()// res.json({message: "Ruta de registro activa"})
}

export async function postRegister (req, res , next){
      try {

        await body('email').isEmail().run(req);
        await body('password').isLength({min: 6}).run(req)
        //hay que poner más validaciones

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }

        const {email , password} = req.body
    
        //buscar el usuario en la base de datos
        const existingUser = await User.findOne({email: email.toLowerCase()})
        //si no lo encuentro, o la contraseña no coincide --> eerror
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });

        }
        // se crea el usuario
        const user = await User.create({
            email: email.toLowerCase(),password
        })
        res.status(201).json({ message: "Usuario registrado correctamente", userId: user._id });


    } catch (error) {
        console.log(error)
         res.status(500).send("Error al registar usuario")
    }
}
