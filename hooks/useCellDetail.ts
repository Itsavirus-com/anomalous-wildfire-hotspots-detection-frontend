import useSWR from 'swr'
import { CellDetail } from '@/types/api'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useCellDetail(h3Index: string | null, date: string | null) {
  const url =
    h3Index
      ? `/api/proxy/cells/${h3Index}${date ? `?date=${date}` : ''}`
      : null

  const { data, error, isLoading } = useSWR<CellDetail>(url, fetcher, {
    revalidateOnFocus: false,
  })

  return { data, error, isLoading }
}
