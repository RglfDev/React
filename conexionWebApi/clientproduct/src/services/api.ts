import axios from "axios";

export const api = axios.create({
    baseURL: 'https://localhost:44326/Products_DB',
    headers: {
        'Content-Type':'application/json'
    }
 
})