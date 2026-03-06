import useSWR from 'swr'
import { CellTimeseriesResponse } from '@/types/api'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useCellTimeseries(h3Index: string | null) {
  const url = h3Index ? `/api/proxy/cells/${h3Index}/timeseries` : null

  const { data, error, isLoading } = useSWR<CellTimeseriesResponse>(url, fetcher, {
    revalidateOnFocus: false,
  })

  return { data, error, isLoading }
}
