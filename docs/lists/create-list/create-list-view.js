export const buildCreatedList = (list) => {
    const newList = document.createElement('section')
 
    newList.innerHTML = `
    <h2>${list.name}</h2>
    <h3>${list.description}</h3>
    <h3>Tags: ${list.tags.length > 0 ? list.tags.join(', ') : 'Sin tags'}</h3>
   
`   
    return newList;
}
