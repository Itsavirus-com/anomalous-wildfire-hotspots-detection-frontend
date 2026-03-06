'use client'

import { useStats, useDailyStats } from '@/hooks/useStats'
import { SummaryCard } from '@/components/stats/SummaryCard'
import { CoherenceDonut } from '@/components/stats/CoherenceDonut'
import { DailyTrendChart } from '@/components/stats/DailyTrendChart'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { format } from 'date-fns'

export default function StatsPage() {
  const { data: stats, isLoading: statsLoading, error: statsError } = useStats()
  const { data: daily, isLoading: dailyLoading } = useDailyStats()

  if (statsLoading) return <div className="flex-1"><LoadingSpinner size="lg" /></div>
  if (statsError || !stats) return <div className="flex-1"><ErrorMessage message="Could not load stats" /></div>

  const { database: db, model, alerts } = stats

  return (
    <div className="flex-1 overflow-y-auto bg-gray-950 p-6">
      <h1 className="text-xl font-bold text-white mb-6">System Statistics</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          label="Total Hotspots"
          value={db.total_hotspots.toLocaleString()}
          accent
        />
        <SummaryCard
          label="Unique Cells"
          value={db.unique_cells.toLocaleString()}
        />
        <SummaryCard
          label="Date Range"
          value={db.date_range_start && db.date_range_end
            ? `${format(new Date(db.date_range_start), 'MMM d')} – ${format(new Date(db.date_range_end), 'MMM d, yyyy')}`
            : '—'
          }
          sub={`${db.total_cell_days.toLocaleString()} cell-days`}
        />
        <SummaryCard
          label="Total Alerts"
          value={alerts.total.toLocaleString()}
          sub={`${alerts.needs_review} need review`}
          accent
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Alert breakdown */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-1">Alert Breakdown by Coherence</h2>
          <p className="text-xs text-gray-500 mb-4">Distribution of spatial coherence levels across all alerts</p>
          <CoherenceDonut stats={alerts} />
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { label: 'High', value: alerts.high_coherence, color: 'text-red-400' },
              { label: 'Medium', value: alerts.medium_coherence, color: 'text-orange-400' },
              { label: 'Low', value: alerts.low_coherence, color: 'text-yellow-400' },
              { label: 'Isolated', value: alerts.isolated, color: 'text-gray-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between text-xs">
                <span className="text-gray-500">{label}</span>
                <span className={`font-mono ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Model info */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-1">Model Information</h2>
          <p className="text-xs text-gray-500 mb-4">Isolation Forest anomaly detection model</p>
          <div className="space-y-3">
            {[
              { label: 'Version', value: model.version },
              { label: 'Trained At', value: model.trained_at ? format(new Date(model.trained_at), 'MMM d, yyyy HH:mm') : '—' },
              { label: 'Training Samples', value: model.training_samples?.toLocaleString() ?? '—' },
              { label: 'Contamination Rate', value: model.contamination != null ? `${(model.contamination * 100).toFixed(1)}%` : '—' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center border-b border-gray-700/40 pb-2">
                <span className="text-xs text-gray-500">{label}</span>
                <span className="text-xs text-white font-mono">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily trend */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white mb-1">Daily Anomaly Trend</h2>
        <p className="text-xs text-gray-500 mb-4">Anomalies detected and alerts selected per day</p>
        {dailyLoading ? (
          <LoadingSpinner />
        ) : daily?.days.length ? (
          <DailyTrendChart data={daily.days} />
        ) : (
          <p className="text-xs text-gray-600">No daily data</p>
        )}
      </div>
    </div>
  )
}
