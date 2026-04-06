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
   // const emailRegExp = new RegExp(REGEXP.mail);
    //if (!emailRegExp.test(useremail)) {
     // alert("Formato de email incorrecto");
    //} else {
      handleLoginUser(loginForm,useremail, password);
    //}
  });
}

async function handleLoginUser(loginForm,useremail, password) {

  try {
    const token = await Login(useremail, password);

    localStorage.setItem('jwt', token)

    window.location.href = "/index.html";

    
  } catch (error) {
    const backendErrors = error.error
    loginEvent(backendErrors,form)
  }
 
}

function loginEvent(error, element){
  const customEvent = new CustomEvent("login-info",{
    detail:{
      error,
    },
  });
  element.dispatchEvent(customEvent)
}