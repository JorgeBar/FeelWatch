import { authenticatedFetch } from "../../utils/authenticated.js"

export async function createList(name,description,tags){
    const token = localStorage.getItem('jwt')
    const response = await authenticatedFetch("http://localhost:3000/lists", {
        method: "POST",
        body: JSON.stringify({
            name,
            description,
            tags
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        if(!response.ok){
        throw new Error("Error creando lista")
    }
    
    const data = await response.json()
    return data.list

    
}