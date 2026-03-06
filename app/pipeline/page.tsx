'use client'

import { usePipelineStatus } from '@/hooks/usePipeline'
import { StatusBadge } from '@/components/pipeline/StatusBadge'
import { ScoreTrigger } from '@/components/pipeline/ScoreTrigger'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { format } from 'date-fns'

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
      <div className="text-xl font-bold font-mono text-white">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  )
}

export default function PipelinePage() {
  const { data: status, isLoading, error, mutate } = usePipelineStatus()

  if (isLoading) return <div className="flex-1"><LoadingSpinner size="lg" /></div>
  if (error || !status) return <div className="flex-1"><ErrorMessage message="Could not load pipeline status" /></div>

  return (
    <div className="flex-1 overflow-y-auto bg-gray-950 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Pipeline Status</h1>
        <StatusBadge status={status.status} />
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Hotspots" value={status.total_hotspots.toLocaleString()} />
        <StatCard label="Scored Records" value={status.total_scored.toLocaleString()} />
        <StatCard label="Total Alerts" value={status.total_alerts.toLocaleString()} />
        <StatCard
          label="Latest Data Date"
          value={status.latest_data_date
            ? format(new Date(status.latest_data_date), 'MMM d, yyyy')
            : '—'
          }
        />
      </div>

      {/* Model version */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <h3 className="text-sm font-semibold text-white mb-2">Model</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Active version:</span>
          <span className="text-xs font-mono text-orange-400">{status.model_version ?? 'unknown'}</span>
        </div>
      </div>

      {/* Score trigger */}
      <ScoreTrigger onScored={() => mutate()} />

      <p className="text-xs text-gray-600 mt-4 text-center">
        Pipeline status auto-refreshes every 10 seconds
      </p>
    </div>
  )
}
