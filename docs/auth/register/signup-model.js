export async function createUser(username, email, password){

    const response = await fetch("https://feelwatch.onrender.com/auth/register", {
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
        const data = await response.json()
        throw data
    }
}