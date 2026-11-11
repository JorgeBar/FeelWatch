import { loginController } from "./login-controller.js"
import { loginNotification } from "../../notification/auth-notification-controller.js"
import { showPassword } from "../../utils/show-hide-password.js"

document.addEventListener("DOMContentLoaded",()=>{
    const loginForm = document.querySelector('form')
    showPassword(loginForm)
    loginController(loginForm) 
    

    loginForm.addEventListener("login-info",(event)=>{
        loginNotification(loginForm,
            event.detail.error,
            event.detail.path
        )
    })

})