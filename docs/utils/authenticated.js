import { jwtDecode } from 'https://cdn.jsdelivr.net/npm/jwt-decode@4.0.0/build/esm/index.js'

export async function  authenticatedFetch(url, options) {
    const response = await fetch(url, options)
        if(response.status === 401){
            window.location.href = '/docs/login.html'
            throw new Error('Unaunthorized')
        }
        return response
}



export function isTokenExpired() {
  const token = localStorage.getItem("jwt");

  if (!token) {
    window.location.href = "/docs/login.html";

}
  const decoded = jwtDecode(token);
  const exp = decoded.exp;
  const date = Date.now() / 1000;

  if (exp < date) {
    window.location.href = "/docs/login.html";
  }
}
