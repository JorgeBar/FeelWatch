export async function getMovieById(movieId) {
  try {
    const response = await fetch(`https://feelwatch.onrender.com/lists/${listId}/movies/${movieId}`);
    if (!response.ok) {
      throw new Error("Recurso no existente");
    }

    const lists = await response.json();
   
    return lists;
  } catch (error) {
    throw new Error(error.message);
  }
}