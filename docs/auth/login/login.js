import { loginController } from "./login-controller.js"
import { loginNotification } from "../../notification/auth-notification-controller.js"

document.addEventListener("DOMContentLoaded",()=>{
    const loginForm = document.querySelector('form')
    loginController(loginForm) 

    loginForm.addEventListener("login-info",(event)=>{
        loginNotification(loginForm,event.detail.error)
    })
})