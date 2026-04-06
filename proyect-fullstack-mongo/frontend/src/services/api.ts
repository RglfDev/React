const API_URL = 'http://localhost:4000/api/users';

import axios from "axios";

export interface User {
    _id?:string;
    name:string;
    email:string;
}

// export const getUsers = async (): Promise<User[]> => {
//     const res = await fetch(API_URL);
//     return res.json();
// }

// export const createUser = async ( user:User) => {
//     await fetch(API_URL, {
//         method: 'POST',
//         headers: {'Content-Type' : 'application/json'},
//         body: JSON.stringify(user)
//     });
// }

export const getUsers = async (): Promise<User[]> => {
    const res = await axios.get<User[]>(API_URL);
    return res.data
}

export const createUser = async ( user:User) => {
    await axios.post(API_URL, user);
}

