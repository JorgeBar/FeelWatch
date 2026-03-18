import { getLists } from "./lists-model.js";
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
export async function listsController(listContainer) {
  //getList
  listContainer.innerHTML = "";
  //spinnerEvent(listContainer);

  try {
    const lists = await getLists();
    setTimeout(()=>{

      listContainer.innerHTML= "";
      fireEvent("Listas cargadas correctamente", "success", listContainer);
      drawLists(lists, listContainer);

    },500)
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
