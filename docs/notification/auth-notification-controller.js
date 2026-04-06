import { buildLoginNotification, buildRegisterNotification } from "./auth-view.js";

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
  
  const password = loginForm.querySelector('#password')
  const parentPassword = password.parentElement

  parentPassword.querySelectorAll(".noti-login").forEach((n) => n.remove());

  const notification = buildLoginNotification(error)
  parentPassword.appendChild(notification);
}
