import useSWR from 'swr'
import { MapResponse } from '@/types/api'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useMapData(date: string | null) {
  const url = date
    ? `/api/proxy/map?date=${date}`
    : '/api/proxy/map'

  const { data, error, isLoading } = useSWR<MapResponse>(url, fetcher, {
    revalidateOnFocus: false,
  })

  return { data, error, isLoading }
}
