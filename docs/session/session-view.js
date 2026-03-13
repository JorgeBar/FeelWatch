

export function buildAuthorizedNav(){
    return `
    <li><a class= "link active" href="/docs/index.html">Home </a></li>
    <li><a class= "link" href="#about">About Us</a></li>
    <li><a class="link" href="/docs/listas_template.html">Lists</a></li>
    <li><a class="link" href="/docs/creacionLista.html">New List</a></li>
    <li> <a class="link" id="logout-link">Log Out</a></li>
    <li><a class="link hidden-btn">Lang</a></li>
    `
}

export function buildUnauthorizedNav(){
        return `
    <li><a class= "link active" href="/docs/index.html">Home </a></li>
    <li><a class= "link" href="#about">About Us</a></li>
    <li><a class="link" href="/docs/listas_template.html">Lists</a></li>
    <li><a class="link" href="/docs/login.html">Login</a></li>
    <li><a class="link hidden-btn">Lang</a></li>

    `
}


export function buildAuthorizedButton(){
    return `
        <a class="main-btn" href="/docs/creacionLista.html" class="btn">Make your Own Personal Lists</a>
    `
}

export function buildUnauthorizedButton(){
    return `
      
        <a class="main-btn" href="/docs/SignUp.html">Register to create your own List yourself!</a>
       
    `
}

