export async function getDesignersByCategory(category) {
    return [
      {
        id: 1,
        name: 'Armando Javier Rodríguez Farfán',
        location: 'Lima, Perú',
        experience: '5 años',
        rating: 4.7,
        description: 'Especialista en diseño gráfico editorial, branding y diseño UX/UI.',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg',
        category: category
      },
      {
        id: 2,
        name: 'María Fernanda Salas',
        location: 'Buenos Aires, Argentina',
        experience: '3 años',
        rating: 4.2,
        description: 'Diseñadora enfocada en identidad visual para marcas sostenibles.',
        photo: 'https://randomuser.me/api/portraits/women/48.jpg',
        category: category
      }
    ]
  }

  export async function getDesignerDetailById(id) {
    return {
      id,
      name: 'Armando Javier Rodríguez Farfán',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      designs: [
        {
          title: 'Medusa: La belleza de lo horripilante',
          image: 'https://img.freepik.com/vector-premium/ilustracion-grafica-vectorial-medusas-formato-archivo-fuente-eps-diseno-icono-escala-perdidas_1038625-17636.jpg',
          rating: 5,
          comments: [
            { user: 'cliente1', text: 'Está muy bonitaaaa 😍' },
            { user: 'cliente2', text: 'Recomendado este diseñador, fue fácil trabajar con él.' },
            { user: 'cliente3', text: 'Me recuerda a cuando veía películas con mi familia.' }
          ]
        },
        {
          title: 'El bosque oculto',
          image: 'https://img.pikbest.com/origin/09/31/65/18EpIkbEsTj3U.jpg!w700wp',
          rating: 4,
          comments: [
            { user: 'cliente4', text: 'Este me gustó más que el anterior 💚' }
          ]
        }
      ]
    }
  }
  