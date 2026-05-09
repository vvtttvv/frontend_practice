import { useEffect, useState } from 'react'
import axios from 'axios'

type FieldItem = {
  form: string
  color: string
  dark: boolean
}

function Field() {
  const [data, setData] = useState<FieldItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    axios
      .get<FieldItem[]>('/test.json', { signal: controller.signal })
      .then((response) => setData(response.data))
      .catch((err: unknown) => {
        if (!axios.isCancel(err)) {
          const message = err instanceof Error ? err.message : 'Unknown error'
          setError(message)
        }
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="field">
      <h2 className="field-title">Field</h2>
      {error ? (
        <p className="field-error">Loading error: {error}</p>
      ) : (
        <pre className="field-data">{JSON.stringify(data, null, 2)}</pre>
      )}
    </section>
  )
}

export default Field
