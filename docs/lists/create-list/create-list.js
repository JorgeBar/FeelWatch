import { createMovieController } from "../../movies/create-movie/create-movie-controller.js"
import { isTokenExpired } from "../../utils/authenticated.js";
import { createListController } from "./create-list-controller.js"
import {sessionController} from "../../session/session-controller.js"


const creatingMovies = [];

document.addEventListener("DOMContentLoaded", () => {

    isTokenExpired()
    
    const sessionContainers = document.querySelectorAll('.session-nav, .session-button')
    sessionController(sessionContainers)
    const createListForm = document.querySelector('form')
    const createdList = document.querySelector('#listsCreated')
    const createdMovie = document.querySelector('#movie-container')
    const buttonAddMovie =document.querySelector('#addMovieButton')
    const moviesPreview = document.querySelector('#movies-preview')
    const closeButtonModal = document.querySelector('#closeModal')



    createListController(createListForm, createdList, creatingMovies)
    createMovieController(createdMovie, buttonAddMovie,creatingMovies,moviesPreview, closeButtonModal)


})