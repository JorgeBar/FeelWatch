import { isTokenExpired } from "../../utils/authenticated.js";
import { editListController } from "./edit-list-controller.js";
import {sessionController} from "../../session/session-controller.js"


document.addEventListener("DOMContentLoaded", () => {

    isTokenExpired()

     const sessionContainers = document.querySelectorAll('.session-nav, .session-button')
    sessionController(sessionContainers)

    const editedListForm = document.querySelector('form')

    editListController(editedListForm)
})