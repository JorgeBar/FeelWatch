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


export async function getCheckAvailableEmail(email){

       try {
           const response = await fetch("https://feelwatch.onrender.com/auth/availableEmail?email=" + email)
        
           if(!response.ok){
           throw new Error("Recurso no existente")
           }
           const data = await response.json();
           return data.available
       } catch (error) {
        throw new Error(error.message)
       } 
      
     
    }
