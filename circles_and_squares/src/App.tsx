import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    axios
      .get('/test.json')
      .then((response) => {
        if (isMounted) {
          setData(response.data)
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Unknown error'
          setError(message)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="app">
      <h1>React + TypeScript</h1>
      {error ? (
        <p>Load error: {error}</p>
      ) : (
        <p>{JSON.stringify(data, null, 2)}</p>
      )}
    </main>
  )
}

export default App
