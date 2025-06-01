// src/hooks/useApi.ts
import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

export function useApi<T>(url: string, config?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, config)
        if (!cancelled) {
          setData(response.data)
          setError(null)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (!cancelled) {
          setError(err)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [config, url])

  return { data, loading, error }
}
