import { loginController } from "./login-controller.js"

document.addEventListener("DOMContentLoaded",()=>{
    const loginForm = document.querySelector('form')
    loginController(loginForm) 
})