'use strict';


function escribetras2Segundos (texto , instruccionesparaDespués){
    setTimeout(function(){
        console.log(texto)
            instruccionesparaDespués()  
    },2000)
}

function serie(n , fn, callback){
    if (n == 0){
        callback();
        return
    }
    n = n -1
    fn('Cuenta Atrás ' + n, function(){
        serie(n, fn, callback)
    })
}

serie(11, escribetras2Segundos, function(){
    console.log('Fin')

})


