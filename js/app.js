let pagina = 1; // la primer pagina es la 1, no la 0

const btnAnterior = document.querySelector('#btnAnterior')
const btnSiguiente = document.querySelector('#btnSiguiente')

btnSiguiente.addEventListener('click', () => {
    // El maximo es de mil paginas
    if (pagina < 1000) {
        pagina += 1
        cargarPeliculas()
    }
})

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1
        cargarPeliculas()
    }
})



const cargarPeliculas = async () => {

    try {

        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7259b0522d8ef15b8214df3c83c5c11e&page=${pagina}`)

        if (respuesta.status === 200) {

            const datos = await respuesta.json()

            let peliculas = ''

            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class = "pelicula">
                        <img class = "poster" src = "https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    </div>
                    <h3 class= "titulo">${pelicula.title}</h3>
                `
            });

            document.getElementById('contenedor').innerHTML = peliculas

        } else {
            console.log('Hubo un error')
        }
        
    } catch (error) {
        console.log(error)
    }
}

cargarPeliculas()