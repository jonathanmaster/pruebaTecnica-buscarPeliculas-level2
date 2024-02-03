import { useEffect, useState, useRef } from 'react'

export function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true) // lo dejamos en true para validar que es el primer input del usuario

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '' // para validar la primera vez que se renderice el componente y no antes pasa de true a false apenas escribe
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un número')
      return
    }

    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return {
    search,
    setSearch,
    error,
  }
}
