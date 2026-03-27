

export function buildAuthorizedNav(){
    return `
    <li><a class= "link active" href="index.html">Home </a></li>
    <li><a class= "link" href="#about">About Us</a></li>
    <li><a class="link" href="listas_template.html">Lists</a></li>
    <li><a class="link" href="creacionLista.html">New List</a></li>
    <li> <a class="link" id="logout-link">Log Out</a></li>
    <li><a class="link hidden-btn">Lang</a></li>
    `
}

export function buildUnauthorizedNav(){
        return `
    <li><a class= "link active" href="index.html">Home </a></li>
    <li><a class= "link" href="index.html#about">About Us</a></li>
    <li><a class="link" href="listas_template.html">Lists</a></li>
    <li><a class="link" href="login.html">Login</a></li>
    <li><a class="link hidden-btn">Lang</a></li>

    `
}


export function buildAuthorizedButton(){
    return `
        <a class="main-btn" href="creacionLista.html" class="btn">New List</a>
    `
}

export function buildUnauthorizedButton(){
    return `
      
        <a class="" id="lists" href="SignUp.html">Register to create your own List!</a>
       
    `
}

