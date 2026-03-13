import { authenticatedFetch } from "../../utils/authenticated.js"

export async function createMovie(
    listId,
    name,
    description,
    director,
    synopsis,
    date,
    imageCarousel,
    imagePoster,
    trailer
){
    const token = localStorage.getItem('jwt')
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('director', director)
    formData.append('synopsis', synopsis)
    formData.append('date', date),
    formData.append('carousel', imageCarousel)
    formData.append('poster', imagePoster)
    formData.append('trailer', trailer)
    const response = await authenticatedFetch(`http://localhost:3000/lists/${listId}/movies`,{
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            } 
    })
    if(!response.ok){
        throw new Error("Error creating movie")
    }
    const data = await response.json()
    return data
}