import { signupController } from "./register-controller.js"
import { registerNotification } from "../../notification/auth-notification-controller.js"

document.addEventListener("DOMContentLoaded",()=>{
    const signupForm = document.querySelector('form')
    signupController(signupForm) 
    signupForm.addEventListener("register-info",(event)=>{
            console.log("evento recibido", event.detail.errors)

        registerNotification(signupForm,event.detail.errors)
    })
})