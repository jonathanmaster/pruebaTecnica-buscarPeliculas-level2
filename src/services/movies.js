const API_KEY = '4ef358d9'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    )
    const json = await response.json()

    const movies = json.Search

    // es el que decide como se hace la transformacion de los datos que vienen de la api
    // si llega a cambiar la api lo tenemos en un solo sitio
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster,
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
