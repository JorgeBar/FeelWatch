import { buildRegisterNotification } from "./auth-view.js"

export function registerNotification(signupForm,errors,path){
     if (path) {
    const input = signupForm.querySelector(`#${path}`);
    if (input) input.parentElement.querySelectorAll(".noti").forEach(n => n.remove());
  }

  for (const error of errors) {
    const input = signupForm.querySelector(`#${error.path}`);
    if (!input) continue;
    const parent = input.parentElement;
    // si quieres múltiples mensajes por campo: no borres dentro del loop
    parent.appendChild(buildRegisterNotification(error));
  }
        
    const parentInput = inputForm.parentElement
    const notification = buildRegisterNotification(error)
    parentInput.querySelectorAll(".noti").forEach(n => n.remove())
    parentInput.appendChild(notification)
    }

export function loginNotification () {
    
}
