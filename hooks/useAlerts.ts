import useSWR from 'swr'
import { AlertsResponse } from '@/types/api'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useAlerts(date: string | null, k = 20) {
  const params = new URLSearchParams({ k: String(k) })
  if (date) params.set('date', date)

  const { data, error, isLoading } = useSWR<AlertsResponse>(
    `/api/proxy/alerts?${params.toString()}`,
    fetcher,
    { revalidateOnFocus: false }
  )

  return { data, error, isLoading }
}
