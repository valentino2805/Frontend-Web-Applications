import axios from 'axios';

export async function getProjects(profileId) {
    try {
        const response = await axios.get('https://my-json-server.typicode.com/SoyValzzz/Creatilink-db2/projects');

        const profileProjects = response.data.filter(project => project.profileId === profileId);

        return profileProjects;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        return [];
    }
}
