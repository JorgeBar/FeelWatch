import basicAuth from 'basic-auth'

export default function(req,res,next){
    const user = basicAuth(req)
    if (!user || user.name !== 'admin' || user.pass !== '1234'){
        res.set('WWW-Authenticate', 'Basic realm=Authorization required')
        res.sendStatus(401)
        return
    }
    next()
}


// esta es una autentificación básica que no creo que lleguea usar en ningun momento. Se usa cuandon no tenemos la autentificación
//fuerte implementada