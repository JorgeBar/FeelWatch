export function showPassword (form){
    const passwordElement = form.querySelector("#password")
    const passwordConfirmElement = form.querySelector("#password-confirm")
    const buttonPassword = form.querySelector(".pass-btn--password")
    const buttonConfirmPass = form.querySelector(".pass-btn--confirm")

    buttonPassword.addEventListener("click",(event) => {
        const eyeOpen = buttonPassword.querySelector('.eye-open')
        const eyeClosed = buttonPassword.querySelector('.eye-closed')
        if(passwordElement.type === "password" ){
            eyeOpen.classList.add('hidden')
            eyeClosed.classList.remove('hidden')
            passwordElement.type = "text"
        }
        else{
            passwordElement.type ="password"
            eyeOpen.classList.remove('hidden')
            eyeClosed.classList.add('hidden')

        }
    })
      buttonConfirmPass.addEventListener("click",(event) => {
        const eyeOpen = buttonConfirmPass.querySelector('.eye-open')
        const eyeClosed = buttonConfirmPass.querySelector('.eye-closed')
        if(passwordConfirmElement.type ==="password"){
            eyeOpen.classList.add('hidden')
            eyeClosed.classList.remove('hidden')
            passwordConfirmElement.type = "text"
        }else{
            passwordConfirmElement.type ="password"
            eyeOpen.classList.remove('hidden')
            eyeClosed.classList.add('hidden')
        }
    })

}