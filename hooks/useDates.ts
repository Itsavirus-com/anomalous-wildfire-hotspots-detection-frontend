import useSWR from 'swr'
import { MapDatesResponse } from '@/types/api'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useDates() {
  const { data, error, isLoading } = useSWR<MapDatesResponse>(
    '/api/proxy/map/dates',
    fetcher,
    { revalidateOnFocus: false }
  )
  return { data, error, isLoading }
}
