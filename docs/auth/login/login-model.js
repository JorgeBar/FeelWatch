export async function Login(email, password){

    const response = await fetch("http://localhost:3000/auth/login", {
        
        method: "POST",
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(!response.ok){
        throw new Error("Credenciales incorrectas")
    }
    
    const {tokenJWT} = await response.json();
    return tokenJWT
}

