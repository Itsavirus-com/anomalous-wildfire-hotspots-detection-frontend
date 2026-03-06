import useSWR from 'swr'
import { PipelineStatus } from '@/types/api'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function usePipelineStatus() {
  const { data, error, isLoading, mutate } = useSWR<PipelineStatus>(
    '/api/proxy/pipeline/status',
    fetcher,
    { refreshInterval: 10000 }
  )
  return { data, error, isLoading, mutate }
}
