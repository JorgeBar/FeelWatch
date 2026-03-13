import { REGEXP } from "../../utils/constants.js";
import { Login } from "./login-model.js";

export function loginController(loginForm) {
  //obtener los datos del formulario
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const userEmailElement = loginForm.querySelector("#mail");
    const passwordElement = loginForm.querySelector("#password");

    const useremail = userEmailElement.value;
    const password = passwordElement.value;

    //validarlos
    const emailRegExp = new RegExp(REGEXP.mail);
    if (!emailRegExp.test(useremail)) {
      alert("Formato de email incorrecto");
    } else {
      handleLoginUser(useremail, password);
    }
  });
}

async function handleLoginUser(useremail, password) {
    const token = await Login(useremail, password);

    localStorage.setItem('jwt', token)

    window.location.href = "/docs/index.html";
 
}
