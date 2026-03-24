import { listsController } from "./lists/list-controller.js"
import { notificationController } from "./notification/notification-controller.js"
import { sessionController } from "./session/session-controller.js"
import {getDemoLists} from "./lists/lists-model.js"


document.addEventListener("DOMContentLoaded", () => {

   const listContainer = document.querySelector("#lists-loading")
   const notificationContainer = document.querySelector("#notification-test")
   const sessionContainers = document.querySelectorAll('.session-nav, .session-button')
   
   if (notificationContainer && listContainer) {
      const {showNotification} = notificationController(notificationContainer)
      
      listContainer.addEventListener("loading-lists-info", (event) =>{
         showNotification(event.detail.message, event.detail.type)
      })
   }
   if(listContainer){
      listsController(listContainer,getDemoLists)
   }

   sessionController(sessionContainers)
})