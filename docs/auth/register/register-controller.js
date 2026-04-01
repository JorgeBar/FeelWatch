import { REGEXP } from "../../utils/constants.js";
import { createUser } from "./signup-model.js";


export function signupController(form) {
    const userNameElement = form.querySelector("#username");
    const userEmailElement = form.querySelector("#email");
    const passwordElement = form.querySelector("#password");
    const passwordConfirmElement = form.querySelector("#password-confirm");
    
    userNameElement.addEventListener("blur", (event)=>{
         const errors =  validateUserName(event.target.value)
           validationFrontend(form,errors,"username")
       })
    userEmailElement.addEventListener("blur", (event)=>{
         const errors =  validateEmail(event.target.value)
           validationFrontend(form,errors,"email")
       })
    function validateBothPass(){
        const errors =  validatePassword(passwordElement.value, passwordConfirmElement.value)
        const passwordErrors = errors.filter(e => e.path === "password");
        const confirmErrors = errors.filter(e => e.path === "password-confirm");

        validationFrontend(form, passwordErrors, "password");
        validationFrontend(form, confirmErrors, "password-confirm");
    }   
        passwordElement.addEventListener("blur", validateBothPass)
        passwordConfirmElement.addEventListener("blur",validateBothPass)

           
         

  //obtener los datos del formulario
  form.addEventListener("submit", (event) => {
    event.preventDefault();


    const username = userNameElement.value;
    const email = userEmailElement.value;
    const password = passwordElement.value;
    //const passwordConfirmed = passwordConfirmElement.value;

    handleCreateUser(form, username, email, password);

   
  });
}
    


function validateUserName(username) {
  const errors = [];

  if (!username.trim()) {
    errors.push({ msg: "Must put a name", path: "username" });
  } else if (username.trim().length < 4) {
    errors.push({
      msg: "The name must have atleast 4 characteres",
      path: "username",
    });
  }else if (username.trim().length > 15) {
    errors.push({
      msg: "The name is too long. The limit is 15 characteres",
      path: "username",
    });
  }else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 -]+$/.test(username.trim())) {
    errors.push({
      msg: "Only numbers, characteres, spaces and hyphens are allowed",path:"username"
    });
  }
  return errors;
}

function validateEmail(email) {
  const errors = [];

  if (!email.trim()) {
    errors.push({ msg: "Must put an email", path: "email" });
  } else {
    const emailRegExp = new RegExp(REGEXP.mail);

    if (!emailRegExp.test(email.trim())) {
      errors.push({ msg: "Must be a valid email format", path: "email" });
    }
  }
  return errors;
}

function validatePassword(password,passwordConfirmed){
    const errors = [];

    if(!password.trim()){
        errors.push({msg:"Must put a password", path:"password"})
    }else if(password.trim().length < 8 ){
        errors.push({msg:"Required atleast 8 characteres", path:"password"})

    }else if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[=@#$])/.test(password.trim())){
        errors.push({msg:"Must have atlest 8 characters, 1 cap, 1 number and one special characterer like these:  =@#$ ", path:"password"})
    }
    if (passwordConfirmed.trim() && password.trim() && password.trim() !== passwordConfirmed.trim()) {
    errors.push({ msg: "Must be matched", path: "password-confirm" });
  }
    return errors;
}


async function handleCreateUser(form, username, email, password) {
  try {
    await createUser(username, email, password);
    window.location.href = "/login.html";
  } catch (error) {
    console.log("BACKEND ERRORS:", error.errors);
    const backendErrors = error.errors;
    registerEvent(backendErrors, form);
  }
}

function registerEvent(errors, element) {
  const customEvent = new CustomEvent("register-info", {
    detail: {
      errors,
    },
  });
  element.dispatchEvent(customEvent);
}

function validationFrontend(element,errors,path){
    const customEvent = new CustomEvent("frontend-errors", {
        detail:{
            path,
            errors
        }
    })
    element.dispatchEvent(customEvent)
}