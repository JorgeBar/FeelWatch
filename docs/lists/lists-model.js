export async function getLists(
  sort,
  search,
  tags,
  skip,
  limit

) {
  try {
  const response = await fetch(`https://feelwatch.onrender.com/lists/?sort=${sort}&tags=${tags}&search=${search}&skip=${skip}&limit=${limit}`);
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
    const response = await fetch(`https://feelwatch.onrender.com/lists/${listId}`);
    if (!response.ok) {
      throw new Error("Recurso no existente");
    }

    const lists = await response.json();
   
    return lists;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getDemoLists(){
    try {
    const response = await fetch(`https://feelwatch.onrender.com/lists/?owner=demo`);
    if (!response.ok) {
      throw new Error("Recurso no existente");
    }

    const lists = await response.json();
   
    return lists;
  } catch (error) {
    throw new Error(error.message);
  }
}



