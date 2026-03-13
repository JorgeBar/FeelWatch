export async function createUser(username, email, password){

    const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(!response.ok){
        throw new Error("Error creando usuario")
    }
}