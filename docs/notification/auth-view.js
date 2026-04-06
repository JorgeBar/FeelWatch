export function buildRegisterNotification (error){
    const newElementNoti = document.createElement('p')

    newElementNoti.innerHTML = error.msg ?? error.error
    newElementNoti.classList.add('noti')

     return newElementNoti
}


export function succesNotification (success){
    const newElementNoti = document.createElement('p')

    newElementNoti.innerHTML = success.msg
    newElementNoti.classList.add('success-noti')
}