import { signupController } from "./register-controller.js"
import { registerNotification } from "../../notification/auth-notification-controller.js"

document.addEventListener("DOMContentLoaded",()=>{
    const signupForm = document.querySelector('form')
    signupController(signupForm) 
    signupForm.addEventListener("register-info",(event)=>{
        registerNotification(signupForm,event.detail.errors)
    })
})