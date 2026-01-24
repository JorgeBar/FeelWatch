import User from "../models/User.js";
import { publishResizeAvatar } from '../lib/publisher.js';
import {body ,validationResult} from 'express-validator'

export async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({
      email: user.email,
      username: user.username,
      avatar: user.avatar || "default-avatar.png",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
}

export async function updateProfile(req, res, next) {
  console.log("UPDATE PROFILE HIT", Date.now());

  try {
    await body('username')
    .notEmpty()
    .isString()
    .isLength({min:5})
    .run(req);
  
     const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()});
            }
    const {username} = req.body;
    const userId = req.apiUserId;
    const user = await User.findById(userId);
  
    if (!user) {
      console.warn(
        `WARNING - el usuario ${userId} está intentando editar una perfil de otro usuario`
      );
      return res.status(401).json({ error: "No autorizado" });
    }
    publishResizeAvatar(userId , req.file.filename)
    
    await User.updateOne({ _id: userId }, { username, 
      avatar: req.file? req.file.filename : user.avatar });
    res.json({ message: "Perfil actualizado" });
  } catch (error) {
    next(error);
  }
}
export async function updatePassword(req, res, next) {
  try {
    const {currentPassword, newPassword} = req.body
    const userId = req.apiUserId
    const user = await User.findById(userId)

    if(!user || !(await user.comparePassword(currentPassword)) ){
            return res.status(401).json({ error: "Contraseña antigua, poner una nueva" })
        }
    const hashedNewPassword = await User.hashPassword(newPassword);
    user.password = hashedNewPassword
    
    await user.save() 
     jwt.sign({_id: user.id}, process.env.JWT_SECRET, {
                expiresIn: '2d'
            }, (err, tokenJWT)=>{
                if (err)   {
                    next(err)
                    return
                }
                res.json({tokenJWT})
                
            })   
  } catch (error) {
    
  }
}


export async function DeleteAccount(req, res, next) {
  try {
    const userId = req.apiUserId;
    //comprobamos que el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "Usuario no encontrado" });
    }
    await List.deleteMany({ owner: userId });

    await Movie.deleteMany({ owner: userId, isTemplate: false });

    await User.deleteOne({ _id: userId });
    res.json({ message: "Cuenta eliminada con éxito" });
  } catch (error) {
    next(error);
  }
}
