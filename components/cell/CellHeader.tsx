import { CellDetail } from '@/types/api'
import { CoherenceBadge } from '@/components/alerts/CoherenceBadge'

interface Props {
  cell: CellDetail
}

export function CellHeader({ cell }: Props) {
  const score = cell.score?.anomaly_score
  const coherence = (cell.alert?.spatial_coherence_level ?? null) as
    | 'high' | 'medium' | 'low' | 'isolated' | null

  return (
    <div>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="font-mono text-xs text-gray-500 mb-0.5">{cell.h3_index}</div>
          <div className="text-sm font-semibold text-white">
            {[cell.province, cell.regency, cell.district].filter(Boolean).join(' › ')}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">{cell.date}</div>
        </div>
        <div className="text-right shrink-0">
          {score != null && (
            <div className={`text-lg font-bold font-mono ${
              score < -0.10 ? 'text-red-400'
              : score < -0.05 ? 'text-orange-400'
              : score < 0 ? 'text-yellow-400'
              : 'text-gray-400'
            }`}>
              {score.toFixed(4)}
            </div>
          )}
          <div className="text-xs text-gray-500">abnormality score</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <CoherenceBadge level={coherence} />
        {cell.alert?.needs_manual_review && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-900/50 text-red-400 border border-red-700">
            ⚑ Needs Attention
          </span>
        )}
        {cell.score?.is_anomaly && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-900/30 text-red-400 border border-red-800">
            Unusual Activity
          </span>
        )}
      </div>
    </div>
  )
}
