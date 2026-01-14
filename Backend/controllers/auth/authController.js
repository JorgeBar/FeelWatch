import jwt from 'jsonwebtoken' 
import User from '../../models/User.js'
import {body , validationResult} from 'express-validator'

export function Login (req, res , next){

   res.json({message: "Ruta de login activa"});
}

export async function postLogin(req, res , next){

    try {
        const {email , password} = req.body
        //Validar que email y password llegan
        //buscar el usuario en la base de datos
        const user = await User.findOne({email: email.toLowerCase()})
        //si no lo encuentro, o la contraseña no coincide --> eerror
        if(!user || !(await user.comparePassword(password)) ){
            return res.status(401).json({ error: "Credenciales incorrectas" })
        }
        
        // si el usuario existe y la contraseña coincide --> apuntar en sus sesión que está logueado
        jwt.sign({_id: user.id}, process.env.JWT_SECRET, {
            expiresIn: '2d'
        }, (err, tokenJWT)=>{
            if (err)   {
                next(err)
                return
            }
            res.json({tokenJWT})
            
        })
        console.log(process.env.JWT_SECRET)
        //req.session.userId = user._id
        //req.session.userEmail = user.email
       
       // res.json({message: "Login correcto", userId: user._id})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno al hacer login" });
    }
}

export function logout(req,res,next){
        res.json({ message: "Logout correcto" }); 
}
export function getRegister(req,res,next){
    res.json({message: "Ruta de registro activa"})
}

export async function postRegister (req, res , next){
      try {
        await body('username').isLength({min: 5}).run(req);
        await body('email').isEmail().run(req);
        await body('password').isLength({min: 6}).run(req);
        //hay que poner más validaciones

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }

        const { username, email , password} = req.body
    
        //buscar el usuario en la base de datos
        const existingUser = await User.findOne({email: email.toLowerCase()})
        //si no lo encuentro, o la contraseña no coincide --> eerror
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });

        }
        // se crea el usuario
        const hashedPassword = await User.hashPassword(password);


        const user = await User.create({
            email: email.toLowerCase(),
            password:hashedPassword,
            username
        })
        await user.sendEmail('Bienvenido', 'Bienvenido a FeelWatch')

        res.status(201).json({ message: "Usuario registrado correctamente", userId: user._id });
        //enviar email de bienvenida al registrarse

    } catch (error) {
        console.log(error)
         res.status(500).send("Error al registar usuario")
    }
}
