import { buildRegisterNotification } from "./auth-view.js";

export function registerNotification(signupForm, errors, path) {
  if (path) {
    const input = signupForm.querySelector(`#${path}`);
    if (input)
      input.parentElement.querySelectorAll(".noti").forEach((n) => n.remove());
  }

  for (const error of errors) {
    const input = signupForm.querySelector(`#${error.path}`);
    if (!input) continue;

    const parentInput = input.parentElement;
    const notification = buildRegisterNotification(error);
    parentInput.appendChild(notification);
  }
}

export function loginNotification(loginForm,error) {
  
  loginForm.querySelectorAll(".noti").forEach((n) => n.remove());
  const notification = buildRegisterNotification(error)
  loginForm.appendChild(notification);
}
