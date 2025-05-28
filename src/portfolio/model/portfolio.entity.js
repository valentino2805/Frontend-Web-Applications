// src/entities/Project.js
export class Project {
    constructor({
                    id,
                    profileId,
                    title,
                    image,
                    likes = '0',
                    comments = '0',
                    description = '',
                    technologies = []
                }) {
        this.id = id;
        this.profileId = profileId;
        this.title = title;
        this.image = image;
        this.likes = likes;
        this.comments = comments;
        this.description = description;
        this.technologies = technologies;
    }
}
