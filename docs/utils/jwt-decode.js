//import { jwtDecode } from "jwt-decode";
import { jwtDecode } from "https://cdn.jsdelivr.net/npm/jwt-decode@4.0.0/build/esm/index.js";

export function getUserIdFromToken() {
  const token = localStorage.getItem("jwt");
  if (token) {
    const decoded = jwtDecode(token);

    return decoded._id;
  }
  return null;
}

