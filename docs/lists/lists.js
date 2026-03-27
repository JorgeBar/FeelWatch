import {handleEditRedirect, listsController } from "../lists/list-controller.js"
import { getLists } from "./lists-model.js"
import {notificationController } from "../notification/notification-controller.js"
import {sessionController } from "../session/session-controller.js"
import {spinnerController} from "../spinner/spinner-controller.js"
import { deleteListController } from "./delete-list/delete-list-controller.js"

document.addEventListener("DOMContentLoaded",async () => {

   const listContainer = document.querySelector("#lists-loading")
   const notificationContainer = document.querySelector("#notification-test")
   const sipnnerContainer = document.querySelector('.spinner')
   const sessionContainers = document.querySelectorAll('.session-nav, .session-button')
   const filterContainer = document.querySelector('.filters')
   const paginationContainer = document.querySelector('.pagination')

   
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
   let currentSort = "name-asc"
   let skip = 0;
   const result = await listsController(listContainer, getLists)
   const page = result.page
   const totalPages = result.totalPages

   const searchElement = document.querySelector('#searching')
   const beforeElement = document.querySelector('#prev-btn')
   const nextElement = document.querySelector('#next-btn')
   const sortElement = document.querySelector('.sort-options')
   const pageElement = document.querySelector('#page-info')
   pageElement.textContent = `${page} of ${totalPages}`

   document.querySelector('.yoursown a').addEventListener('click', (e) => {
    e.stopPropagation()
})

   if (filterContainer){
      filterContainer.addEventListener("search",()=>{
          listsController(listContainer,getLists,currentSort,searchElement.value,skip)
      })
      filterContainer.addEventListener("click", async(e) =>{
         e.preventDefault()
         if(e.target.id.includes("name-asc")){
           sortElement.classList.add('active')
            currentSort = "name-asc"
            listsController(listContainer,getLists,currentSort)

         }

         if(e.target.id.includes('name-desc')) {
           sortElement.classList.add('active')
            currentSort="name-desc"
            listsController(listContainer,getLists,currentSort)
         }  
      })
   
   }
   if (paginationContainer){
      beforeElement.addEventListener("click", (e)=>{
         e.preventDefault()
         if (skip!=0){
            skip = skip -10;
         }
         listsController(listContainer,getLists,currentSort, searchElement.value,skip)
      })
       nextElement.addEventListener("click", (e)=>{
         e.preventDefault()
         skip = skip + 10
         listsController(listContainer,getLists,currentSort, searchElement.value,skip)
         
      })
   }
   
   sessionController(sessionContainers)
})