import { signupController } from "./register-controller.js"
import { registerNotification } from "../../notification/auth-notification-controller.js"
import { showPassword } from "../../utils/show-hide-password.js"

document.addEventListener("DOMContentLoaded",()=>{
    const signupForm = document.querySelector('form')
    showPassword(signupForm)
    
    signupController(signupForm) 
    signupForm.addEventListener("register-info",(event)=>{
            console.log("evento recibido", event.detail.errors)

        registerNotification(signupForm,event.detail.errors)
    })

    signupForm.addEventListener("frontend-errors",(event)=>{
        registerNotification(signupForm,event.detail.errors,event.detail.path)
    })
})