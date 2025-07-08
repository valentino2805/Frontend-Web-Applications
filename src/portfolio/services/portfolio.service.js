import axios from 'axios';

export async function getProjects(profileId) {
    try {
        const response = await axios.get(`https://creatilink-api-production-d54e.up.railway.app/api/v1/projects/by-profile/${profileId}`);

        const profileProjects = response.data.filter(project => project.profileId === profileId);

        return profileProjects;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        return [];
    }
}
