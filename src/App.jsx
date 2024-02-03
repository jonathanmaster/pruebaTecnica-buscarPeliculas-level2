import { useCallback, useState } from 'react'
import './App.css'
import { Loading } from './components/Loading'

import { MoviesResults } from './components/Movies'
import { useMoviesApi } from './hook/useMoviesApi'
import { useSearch } from './hook/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)

  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMoviesApi({ search, sort })

  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 500),
    []
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    // const { search } = Object.fromEntries(new window.FormData(event.target)) // para recuperar todos los inputs
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form onSubmit={handleSubmit} className='form'>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }}
            onChange={handleChange}
            type='text'
            value={search}
            name='search'
            placeholder='Avengers, Star Wars, The Matrix...'
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>{loading ? <Loading /> : <MoviesResults movies={movies} />}</main>
    </div>
  )
}

export default App
