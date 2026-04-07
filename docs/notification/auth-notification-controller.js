import { buildLoginNotification, buildRegisterNotification } from "./auth-view.js";

export function registerNotification(signupForm, errors, path) {
  if (path) {
    const input = signupForm.querySelector(`#${path}`);
    if (input){
     const fieldContainer = input.closest(".form__input") || input.parentElement;
      fieldContainer.querySelectorAll(".noti").forEach((n) => n.remove());
    }
  }

  for (const error of errors) {
    const input = signupForm.querySelector(`#${error.path}`);
    if (!input) continue;

    const fieldContainer = input.closest(".form__input") || input.parentElement;
    const notification = buildRegisterNotification(error);
    parentInput.appendChild(notification);
  }
}

export function loginNotification(loginForm,error) {
  
  const password = loginForm.querySelector('#password')
  const fieldContainer = password.closest(".form__input") || password.parentElement;

  fieldContainer.querySelectorAll(".noti-login").forEach((n) => n.remove());

  const notification = buildLoginNotification(error)
  fieldContainer.appendChild(notification);
}
