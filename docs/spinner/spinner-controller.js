import { buildSpinner } from "./spinner-view.js";

export function spinnerController (sipnnerContainer){
    
    buildSpinner(sipnnerContainer);
    const showSpinner = () => {
        
        sipnnerContainer.classList.toggle('hidden')
    }
    return {
        showSpinner
    }
    

}