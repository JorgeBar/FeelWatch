import { buildRegisterNotification } from "./auth-view.js"

export function registerNotification(signupForm,errors){
    for( const error of errors){
    const inputForm = signupForm.querySelector(`#${error.path}`)
    if(!inputForm){
        continue
    } 
        
    const parentInput = inputForm.parentElement
    const notification = buildRegisterNotification(error)
    parentInput.querySelectorAll(".noti").forEach(n => n.remove())
    parentInput.appendChild(notification)
    }
}
export function loginNotification () {
    
}
