export async function getLists() {
  try {
    const response = await fetch("http://localhost:3000/lists/");
    if (!response.ok) {
      throw new Error("Recurso no existente");
    }
    const lists = await response.json();
    
    return lists;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getListById(listId) {
  try {
    const response = await fetch(`http://localhost:3000/lists/${listId}`);
    if (!response.ok) {
      throw new Error("Recurso no existente");
    }

    const lists = await response.json();
   
    return lists;
  } catch (error) {
    throw new Error(error.message);
  }
}
