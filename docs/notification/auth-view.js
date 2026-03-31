export function buildRegisterNotification (error){
    const newElementNoti = document.createElement('p')

    newElementNoti.textContent= error.message

     return newElementNoti
}