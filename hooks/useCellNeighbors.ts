import useSWR from 'swr'
import { CellNeighborsResponse } from '@/types/api'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useCellNeighbors(h3Index: string | null, date: string | null) {
  const url =
    h3Index
      ? `/api/proxy/cells/${h3Index}/neighbors${date ? `?date=${date}` : ''}`
      : null

  const { data, error, isLoading } = useSWR<CellNeighborsResponse>(url, fetcher, {
    revalidateOnFocus: false,
  })

  return { data, error, isLoading }
}
