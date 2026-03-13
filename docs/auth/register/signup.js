import { signupController } from "./register-controller.js"

document.addEventListener("DOMContentLoaded",()=>{
    const signupForm = document.querySelector('form')
    signupController(signupForm) 
})