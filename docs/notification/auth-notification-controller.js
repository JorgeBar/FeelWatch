import { buildRegisterNotification } from "./auth-view.js"

export function registerNotification(signupForm,errors){
    for( const error of errors){
    const inputForm = signupForm.querySelector(`#${error.path}`)
    const parentInput = inputForm.parentElement
    const notification = buildRegisterNotification(error)
    console.log(error.path)
    parentInput.appendChild(notification)
    }
}
export function loginNotification () {
    
}
