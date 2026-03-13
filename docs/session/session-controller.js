import {
  buildAuthorizedNav,
  buildUnauthorizedNav,
  buildAuthorizedButton,
  buildUnauthorizedButton,
} from "./session-view.js";

export function sessionController(sessionContainers) {
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("jwt");
    // transformación a boolean
    return !!token;
  };
  sessionContainers.forEach((container) => {
    if (isUserLoggedIn()) {
      if (container.classList.contains("session-nav")) {
        container.innerHTML = buildAuthorizedNav();
        const closeSessionLink= container.querySelector("#logout-link");
        if(closeSessionLink){
            closeSessionLink.addEventListener("click", (e) => {
              e.preventDefault()
              localStorage.removeItem("jwt");
              // pudimos poner un windows.reload o location. Pero volviendo a llamar la funcíón
              //ahorramos el pedir datos al back y simplemente carga de nuevo en el browser el contenido
              sessionController(sessionContainers);

            });
        }
      } else if (container.classList.contains("session-button")) {
        container.innerHTML = buildAuthorizedButton();
      }
    } else {
      if (container.classList.contains("session-nav")) {
        container.innerHTML = buildUnauthorizedNav();
      } else if (container.classList.contains("session-button")) {
        container.innerHTML = buildUnauthorizedButton();
      }
    }
  });
}
