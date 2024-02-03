/* eslint-disable react/prop-types */
const ListOfMovies = ({ movies }) => {
  return (
    <ul className='movies'>
      {movies.map((movie) => (
        <li className='movie' key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.Title} />
        </li>
      ))}
    </ul>
  )
}

const NoMoviesResults = () => {
  return (
    <>
      <p>No se encontraron peliculas para esta busqueda</p>
    </>
  )
}

// eslint-disable-next-line react/prop-types
export const MoviesResults = ({ movies }) => {
  const hasMovies = movies?.length > 0 // Si movies no es nulo ni indefinido, verifica si su longitud es mayor que cero

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
}
