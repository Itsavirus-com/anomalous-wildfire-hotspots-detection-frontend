'use client'

import { AlertItem } from '@/types/api'
import { CoherenceBadge } from './CoherenceBadge'
import { useStore } from '@/store/useStore'

interface Props {
  alert: AlertItem
  isSelected?: boolean
}

export function AlertCard({ alert, isSelected }: Props) {
  const { openCellAt } = useStore()

  return (
    <button
      onClick={() => openCellAt(alert.h3_index, alert.center_lat ?? 0, alert.center_lng ?? 0)}
      className={`w-full text-left px-4 py-3 border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors ${
        isSelected ? 'bg-orange-900/30 border-l-2 border-l-orange-500' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-500 font-mono">#{alert.rank}</span>
            <span className="text-xs text-gray-400 truncate">
              {alert.province ?? alert.regency ?? alert.h3_index.slice(0, 12) + '…'}
            </span>
            {alert.needs_manual_review && (
              <span className="text-xs text-red-400 font-semibold">⚑ Review</span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <CoherenceBadge level={alert.spatial_coherence_level} />
            {alert.hotspot_count != null && (
              <span className="text-xs text-gray-500">
                {alert.hotspot_count} hotspot{alert.hotspot_count !== 1 ? 's' : ''}
              </span>
            )}
            {alert.total_frp != null && (
              <span className="text-xs text-gray-500">
                {alert.total_frp.toFixed(0)} MW FRP
              </span>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm font-mono font-semibold text-orange-400">
            {alert.hybrid_score.toFixed(3)}
          </div>
          <div className="text-xs text-gray-500">score</div>
        </div>
      </div>
    </button>
  )
}
