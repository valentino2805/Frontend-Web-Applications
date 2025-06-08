import User from '../model/user.entity.js';

const BASE_URL = 'https://creatilink-api-production-4e2f.up.railway.app/api/v1';

const API_URL = `${BASE_URL}/authentication`;
const API_URL_USERS = `${BASE_URL}/users`;





export const authService = {
    async login(email, password) {
        const res = await fetch(`${API_URL}/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) throw new Error('Error en el inicio de sesión');

        const user = await res.json();
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    },


    async register(userData) {
        const res = await fetch(`${API_URL}/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!res.ok) throw new Error('Error al registrar usuario');

        return await res.json();
    },


    logout() {
        localStorage.removeItem('currentUser');
    },

    getCurrentUser() {
        const data = localStorage.getItem('currentUser');
        return data ? JSON.parse(data) : null;
    },

    async getAllUsers() {
        const res = await fetch(API_URL_USERS);
        if (!res.ok) throw new Error('Error al obtener los usuarios');
        const users = await res.json();
        return users;
    }

};
