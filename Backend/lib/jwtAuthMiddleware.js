import jwt from 'jsonwebtoken'
import createError from 'http-errors'

export function  guard(req,res,next){
    //sacar el tokenJWT de la cabecera, body, o de la query-string
    const tokenJWT = req.get('Authorization') || req.body?.jwt || req.query?.jwt

    // Si no tengo token --> error
    if (!tokenJWT){
        console.warn('Auth guard: no token provided');
         return res.status(401).json({ error: 'No token provided' });

    }

    // Compruebo que el token es válido
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) =>{
        if(err){
           console.warn('Auth guard: invalid token');
           return res.status(401).json({ error: 'Invalid token' });

        }
        // apuntamos el id del usuario logado en la request
        // para que lso proximos middlewares pudan leerlo de ahi
        req.apiUserId = payload._id
        next()
    })
}