
export function buildSpinner (sipnnerContainer){
 
 sipnnerContainer.innerHTML = `
        <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>`

 return sipnnerContainer;
}