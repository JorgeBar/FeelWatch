export function buildRegisterNotification (error){
    const newElementNoti = document.createElement('p')

    newElementNoti.innerHTML = error.msg 
    newElementNoti.classList.add('noti')

     return newElementNoti
}
export function buildLoginNotification(error){
    const newElementNoti = document.createElement('h3')

    newElementNoti.innerHTML = error.msg
    newElementNoti.classList.add('noti-login')

    return newElementNoti
}

export function succesNotification (success){
    const newElementNoti = document.createElement('p')

    newElementNoti.innerHTML = success.msg
    newElementNoti.classList.add('success-noti')
}