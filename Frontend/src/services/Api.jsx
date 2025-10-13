import axios from "axios";

const API = axios.create({   // Creates a pre-configured Axios instance, Lets you add defaults (baseURL, headers, interceptors).
  baseURL: import.meta.env.VITE_API_URL, 
});

// Add token to every request if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");  // Get token from local storage after setting the token during login and provides it every function.
  if (token) {  // check if token exists or not.
    req.headers.Authorization = `Bearer ${token}`; // Set the Authorization header with the Bearer token.
  }
  return req;
});

export default API;


//                          <---------NOTE-------->

// This file is responsible for making API calls to the backend and handling authentication tokens.
// we don't need to write token logic -->
//  ( const token = localStorage.getItem("token");
//  if (token) {req.headers.Authorization = `Bearer ${token}`;}) 
// in every where that makes an API call.