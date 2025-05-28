import User from '../model/user.entity.js';

const API_URL = 'https://my-json-server.typicode.com/SoyValzzz/Creatilink-db/users';


async function getAllUsers() {
    const res = await fetch(API_URL);
    const users = await res.json();
    return users;
}

export const authService = {
    async login(email, password) {
        const res = await fetch(`${API_URL}?email=${email}&password=${password}`);
        const users = await res.json();

        if (users.length) {
            const user = users[0];
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        } else {
            throw new Error('Email o contraseña incorrectos');
        }
    },

    async register(userData) {

        const check = await fetch(`${API_URL}?email=${userData.email}`);
        const exists = await check.json();

        if (exists.length) throw new Error('El correo ya está registrado');


        let userWithId = { ...userData, id: Date.now() };


        if (userData.role === 'profile') {
            userWithId = { ...userWithId, profileId: Date.now() };
        } else if (userData.role === 'client') {
            userWithId = { ...userWithId, clientId: Date.now() };
        }


        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userWithId)
        });

        if (!res.ok) throw new Error('Error al registrar usuario');

        return userWithId;
    },

    logout() {
        localStorage.removeItem('currentUser');
    },

    getCurrentUser() {
        const data = localStorage.getItem('currentUser');
        return data ? JSON.parse(data) : null;
    },

    async getAllUsers() {
        const res = await fetch(API_URL);
        const users = await res.json();
        return users;
    }
};
