export function buildRegisterNotification (error){
    const newElementNoti = document.createElement('p')

    newElementNoti.innerHTML = error.msg
    newElementNoti.classList.add('noti')

     return newElementNoti
}