import {handleEditRedirect, listsController } from "../lists/list-controller.js"
import { getLists } from "./lists-model.js"
import {notificationController } from "../notification/notification-controller.js"
import {sessionController } from "../session/session-controller.js"
import {spinnerController} from "../spinner/spinner-controller.js"
import { deleteListController } from "./delete-list/delete-list-controller.js"

document.addEventListener("DOMContentLoaded", () => {

   const listContainer = document.querySelector("#lists-loading")
   const notificationContainer = document.querySelector("#notification-test")
   const sipnnerContainer = document.querySelector('.spinner')
   const sessionContainers = document.querySelectorAll('.session-nav, .session-button')
   
   if (notificationContainer && listContainer) {
      const {showNotification} = notificationController(notificationContainer)
      
      listContainer.addEventListener("loading-lists-info", (event) =>{
         showNotification(event.detail.message, event.detail.type)
      })
   }
   
   if (sipnnerContainer && listContainer) {
      const {showSpinner} = spinnerController(sipnnerContainer)
      
      listContainer.addEventListener("loading-spinner", () =>{
         showSpinner()
      })
   }
   
   if (listContainer) {
      listsController(listContainer,getLists)
      deleteListController(listContainer)
      handleEditRedirect(listContainer)
   }
   
   sessionController(sessionContainers)
})