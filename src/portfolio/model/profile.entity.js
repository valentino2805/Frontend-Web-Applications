export class Profile {
    constructor({
                    name,
                    location,
                    bio,
                    image,
                    icon,         // Nueva propiedad para el ícono
                    experience,
                    social        // Añadimos social para manejar redes sociales
                }) {
        this.name = name;
        this.location = location;
        this.bio = bio;
        this.image = image;
        this.icon = icon || ''; // Aseguramos que icon tenga un valor por defecto vacío si no se pasa uno
        this.experience = experience;
        this.social = social || {}; // Aseguramos que social no sea undefined
    }
}
