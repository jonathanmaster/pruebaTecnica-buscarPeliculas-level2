import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMoviesApi({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previusSearch = useRef(search)

  // para que no se vuelva crear cuando se hace el sort
  // useCallback es para las funciones pero por detras tiene el useMemo
  const getMovies = useCallback(async ({ search }) => {
    // se lo pasamos por parametro para que solo se genere una vez

    if (search == previusSearch.current) return // esto es por si hace la misma búsqueda

    try {
      setLoading(true)
      previusSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
      // setLoading(false)
    } catch (error) {
      setError(error.message)
    } finally {
      // esto se ejecuta cuando entra al try y al catch
      setLoading(false)
    }
  }, [])

  // para que no se renderize nuevamente todo cuando hace el sort o busca las movies
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies]) // si no cambia el sort o las peliculas entonces no vuelva a renderizar

  return {
    movies: sortedMovies,
    getMovies,
    loading,
    error,
  }
}
