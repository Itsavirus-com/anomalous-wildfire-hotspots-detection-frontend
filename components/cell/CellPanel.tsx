'use client'

import { useStore } from '@/store/useStore'
import { useCellDetail } from '@/hooks/useCellDetail'
import { useCellTimeseries } from '@/hooks/useCellTimeseries'
import { useCellNeighbors } from '@/hooks/useCellNeighbors'
import { CellHeader } from './CellHeader'
import { TimeseriesChart } from './TimeseriesChart'
import { NeighborGrid } from './NeighborGrid'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-gray-700/40">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs text-gray-200 font-mono">{value ?? '—'}</span>
    </div>
  )
}

export function CellPanel() {
  const { selectedCell, selectedDate, panelOpen, closePanel } = useStore()
  const { data: cell, isLoading: cellLoading } = useCellDetail(selectedCell, selectedDate)
  const { data: timeseries, isLoading: tsLoading } = useCellTimeseries(selectedCell)
  const { data: neighbors } = useCellNeighbors(selectedCell, selectedDate)

  if (!panelOpen || !selectedCell) return null

  return (
    <div className="absolute right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-700 flex flex-col z-10 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 shrink-0">
        <h3 className="text-sm font-semibold text-white">Area Detail</h3>
        <button
          onClick={closePanel}
          className="text-gray-500 hover:text-white transition-colors text-lg leading-none"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {cellLoading && <LoadingSpinner />}

        {cell && (
          <>
            <CellHeader cell={cell} />

            {/* Aggregate stats */}
            {cell.aggregate && (
              <div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-1">Fire Activity</h4>
                <StatRow label="Active fire points" value={cell.aggregate.hotspot_count} />
                <StatRow
                  label="Total fire intensity"
                  value={cell.aggregate.total_frp != null ? cell.aggregate.total_frp.toFixed(1) + ' MW' : null}
                />
                <StatRow
                  label="Peak fire intensity"
                  value={cell.aggregate.max_frp != null ? cell.aggregate.max_frp.toFixed(1) + ' MW' : null}
                />
                <StatRow
                  label="Avg fire intensity"
                  value={cell.aggregate.avg_frp != null ? cell.aggregate.avg_frp.toFixed(1) + ' MW' : null}
                />
              </div>
            )}

            {/* Features */}
            {cell.features && (
              <div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-1">Trend Signals</h4>
                <StatRow
                  label="Change from yesterday"
                  value={cell.features.delta_count_vs_prev_day != null ? (cell.features.delta_count_vs_prev_day > 0 ? '+' : '') + cell.features.delta_count_vs_prev_day.toFixed(0) + ' fire points' : null}
                />
                <StatRow
                  label="vs. 7-day average"
                  value={cell.features.ratio_vs_7d_avg != null ? cell.features.ratio_vs_7d_avg.toFixed(1) + '× usual' : null}
                />
                <StatRow
                  label="Nearby area activity"
                  value={cell.features.neighbor_activity != null ? cell.features.neighbor_activity + ' active neighbors' : null}
                />
              </div>
            )}

            {/* Alert info */}
            {cell.alert && (
              <div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-1">Alert Info</h4>
                <StatRow label="Alert rank today" value={`#${cell.alert.rank} most severe`} />
                <StatRow label="Severity score" value={cell.alert.hybrid_score.toFixed(4)} />
                <StatRow label="Detection model" value={cell.score?.model_version} />
              </div>
            )}

            {/* Timeseries chart */}
            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">30-Day Trend</h4>
              {tsLoading ? (
                <LoadingSpinner size="sm" />
              ) : timeseries?.timeseries?.length ? (
                <TimeseriesChart data={timeseries.timeseries} />
              ) : (
                <p className="text-xs text-gray-600">No timeseries data</p>
              )}
            </div>

            {/* Neighbors */}
            {neighbors && (
              <NeighborGrid neighbors={neighbors.neighbors} cell={cell} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
