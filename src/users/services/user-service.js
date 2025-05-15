import axios from 'axios'
import User from '../model/user.entity.js'






export async function registerUser(data) {
    const user = new User(data)

    try {
        const response = await axios.post('http://localhost:3000/api/v1/users', data)
        return response.data
    } catch (error) {
        console.error('Error al registrar usuario:', error)
        throw error
    }
}


export async function loginUser(email, password) {
    try {
        const response = await axios.get('http://localhost:3000/api/v1/users', {
            params: { email, password }
        })

        const users = response.data

        if (users.length > 0) {
            return users[0] // login correcto
        } else {
            return null // usuario no encontrado
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        throw error
    }
}


