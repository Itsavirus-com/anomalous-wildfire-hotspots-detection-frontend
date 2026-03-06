import useSWR from 'swr'
import { StatsResponse, DailyStatsResponse } from '@/types/api'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useStats() {
  const { data, error, isLoading } = useSWR<StatsResponse>(
    '/api/proxy/stats',
    fetcher,
    { revalidateOnFocus: false }
  )
  return { data, error, isLoading }
}

export function useDailyStats() {
  const { data, error, isLoading } = useSWR<DailyStatsResponse>(
    '/api/proxy/stats/daily',
    fetcher,
    { revalidateOnFocus: false }
  )
  return { data, error, isLoading }
}
