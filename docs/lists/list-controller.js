import { buildEmptyList,buildCarousel } from "./lists-view.js";
import { getUserIdFromToken } from "../utils/jwt-decode.js";


function drawLists(lists, listContainer) {
  if (lists.length === 0) {
    const noListAvailable = buildEmptyList(lists);
    listContainer.appendChild(noListAvailable);
  } else {

    lists.lists.forEach((list, index) => {
      const checkOwner = isOwner(list)
      const carouselElement = buildCarousel(list,index +1 ,checkOwner);
      listContainer.appendChild(carouselElement);
    });
  }
}
function fireEvent(message, type, element) {
  const customEvent = new CustomEvent("loading-lists-info", {
    detail: {
      message,
      type,
    },
  });
  element.dispatchEvent(customEvent);
}
function spinnerEvent(element) {
  const customEvent = new CustomEvent("loading-spinner", {});
  element.dispatchEvent(customEvent);
}
export async function listsController(listContainer, fetchFunction) {
  //getList
  //spinnerEvent(listContainer);

  try {
    const lists = await fetchFunction();
    const dummy = document.createElement('div');

    drawLists(lists, dummy);

    listContainer.replaceChildren(...dummy.childNodes);
    fireEvent("Listas cargadas correctamente", "success", listContainer);
  } catch (error) {
    fireEvent(error.message, "error", listContainer);
  } //finally {
    //spinnerEvent(listContainer);
  //}
}



export function handleEditRedirect(listContainer) {
  listContainer.addEventListener("click", async (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const listId = e.target.dataset.listId;
      window.location.href = `/edit-list.html?id=${listId}`;
    }
  });
}
function isOwner(list) {
  const currentUserId = getUserIdFromToken();
  const owner = list.owner;


  if (currentUserId === owner) {
    return true;
  }
  return false;
}
