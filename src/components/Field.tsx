import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

type FieldItem = {
  form: string
  color: string
  dark: boolean
}

function Field() {
  const [data, setData] = useState<FieldItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { shapes, colors, tone, columns } = useSelector(
    (state: RootState) => state.filters,
  )

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

  const filtered = useMemo(() => {
    if (!data) return []

    return data.filter((item) => {
      if (item.form !== 'circle' && item.form !== 'square') return false
      if (item.color !== 'red' && item.color !== 'green' && item.color !== 'blue' && item.color !== 'yellow') {
        return false
      }

      if (item.form === 'circle' && !shapes.circle) return false
      if (item.form === 'square' && !shapes.square) return false

      if (!colors[item.color]) return false

      if (tone === 'dark' && !item.dark) return false
      if (tone === 'light' && item.dark) return false

      return true
    })
  }, [data, shapes, colors, tone])

  return (
    <section className="field">
      {error ? (
        <p className="field-error">Loading error: {error}</p>
      ) : !data ? (
        <p className="field-loading">Loading...</p>
      ) : (
        <div
          className="field-grid"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {filtered.map((item, index) => (
            <div
              key={`${item.form}-${item.color}-${index}`}
              className={`shape shape-${item.form} tone-${item.dark ? 'dark' : 'light'} color-${item.color}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Field
