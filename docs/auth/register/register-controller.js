import { REGEXP  } from "../../utils/constants.js";
import { createUser } from "./signup-model.js"

export function signupController(form ,registerNotification){
    //obtener los datos del formulario
    form.addEventListener("submit",(event) =>{
        event.preventDefault();

        const userNameElement = form.querySelector("#name")
        const userEmailElement = form.querySelector("#mail")
        const passwordElement = form.querySelector("#password")
        const paswordConfirmElement = form.querySelector("#password-confirm")

        const username = userNameElement.value; 
        const email = userEmailElement.value;
        const password = passwordElement.value;
        const passwordConfirmed= paswordConfirmElement.value

        const errors = [];

        //validarlos
        const emailRegExp = new RegExp(REGEXP.mail);
        if (!emailRegExp.test(email)){
            errors.push({ message:'Must be a valid email or you already signed', field: 'mail'})
        };
        if(!username){
            errors.push({message:'Name already taken', field:'name'})
        }

        if (password !== passwordConfirmed){
            errors.push({message:'Passwords does not match', field:'password'})
        }
        //for (const error of errors){
          //  registerEvent
        //}
        registerEvent()

        if(errors.length === 0){
        console.log('Llamando a handleCreateUser')  // AÑADE ESTO
         handleCreateUser(username,email,password)            

        }
    })

}

    async function handleCreateUser(username,email,password){
        try {
        await createUser(username,email,password)
        window.location.href = "/login.html"

        } catch (error) {
            alert("error")
        }
    }


    function registerEvent(errors, element) {
    const customEvent = new CustomEvent("register-info", {
        detail: {
            errors
        },
    });
  element.dispatchEvent(customEvent);
}