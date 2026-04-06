export async function Login(email, password){

    const response = await fetch("https://feelwatch.onrender.com/auth/login", {
        
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
        const data = await response.json()
        throw data
    }
    
    const {tokenJWT} = await response.json();
    return tokenJWT
}

