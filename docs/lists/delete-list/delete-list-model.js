import { authenticatedFetch } from "../../utils/authenticated.js"

export async function deleteList(listId){
    const token = localStorage.getItem('jwt')
    const response = await authenticatedFetch(`https://feelwatch.onrender.com/lists/${listId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        if(!response.ok){
        throw new Error("Error borrando la  lista")
    }

}