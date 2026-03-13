import { authenticatedFetch } from "../../utils/authenticated.js"

export async function editList(listId,name,description,tags){
    const token = localStorage.getItem('jwt')
    const response = await authenticatedFetch(`http://localhost:3000/lists/${listId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify( {
            name,
            description,
            tags
        })
    })
        if(!response.ok){
        throw new Error("Error editando la  lista")
    }

}