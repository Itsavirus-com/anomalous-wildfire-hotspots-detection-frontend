'use client'

import type { CellDetail, NeighborCell as NeighborCellData } from '@/types/api'

function anomalyColor(cell: NeighborCellData): string {
  if (cell.hotspot_count == null || cell.hotspot_count === 0)
    return 'bg-gray-800/60 text-gray-600'
  if (cell.is_anomaly) {
    const score = cell.anomaly_score ?? 0
    if (score < -0.10) return 'bg-red-900/80 text-red-300 ring-1 ring-red-600'
    if (score < -0.05) return 'bg-orange-900/80 text-orange-300 ring-1 ring-orange-600'
    return 'bg-yellow-900/80 text-yellow-300 ring-1 ring-yellow-600'
  }
  return 'bg-gray-700/60 text-gray-400'
}

function NeighborCell({ cell }: { cell: NeighborCellData }) {
  return (
    <div
      className={`rounded-md p-1.5 text-center ${anomalyColor(cell)}`}
      title={cell.h3_index}
    >
      <div className="text-xs font-bold">{cell.hotspot_count ?? '—'}</div>
      <div className="text-[10px] opacity-60 leading-none mt-0.5">
        {cell.is_anomaly ? '⚠' : 'hotspot' in cell ? '·' : '—'}
      </div>
    </div>
  )
}

interface Props {
  neighbors: NeighborCellData[]
  cell: CellDetail
}

export function NeighborGrid({ neighbors, cell }: Props) {
  const n = neighbors.slice(0, 6)

  // Map 6 H3 neighbors into a fixed 3×3 grid leaving center = slot [4] (index 4)
  // Slot order: 0 1 2 / 3 [C] 4 / 5 (fills remaining naturally)
  // We use explicit CSS grid-area by placing center at col2/row2
  const label = [cell.province, cell.regency, cell.district]
    .filter(Boolean)
    .slice(0, 1)
    .join('') || cell.h3_index.slice(0, 8) + '…'

  const score = cell.score?.anomaly_score

  return (
    <div>
      <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Neighbor Activity</h4>

      {n.length === 0 ? (
        /* Isolated — show center + explanation */
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="rounded-md bg-orange-900/50 border border-orange-600 px-4 py-2 text-center">
            <div className="text-xs text-orange-400 font-semibold">{label}</div>
            {score != null && (
              <div className="text-xs text-gray-400 font-mono mt-0.5">{score.toFixed(4)}</div>
            )}
          </div>
          <p className="text-xs text-gray-600 text-center">
            No active neighbors — cell is spatially isolated
          </p>
        </div>
      ) : (
        /* 3×3 grid with center fixed at position [1,1] */
        <div className="grid grid-cols-3 gap-1.5">
          {/* Row 1: neighbors 0, 1, 2 */}
          {[n[0], n[1], n[2]].map((nb, i) =>
            nb ? (
              <NeighborCell key={nb.h3_index} cell={nb} />
            ) : (
              <div key={`empty-t${i}`} className="rounded-md bg-gray-800/30 p-1.5" />
            )
          )}

          {/* Row 2: neighbor 3, CENTER, neighbor 4 */}
          {n[3] ? (
            <NeighborCell key={n[3].h3_index} cell={n[3]} />
          ) : (
            <div className="rounded-md bg-gray-800/30 p-1.5" />
          )}

          {/* Center cell */}
          <div className="rounded-md bg-orange-900/50 border border-orange-600 p-1.5 text-center">
            <div className="text-[10px] text-orange-400 font-semibold leading-tight truncate">{label}</div>
            {score != null && (
              <div className="text-[10px] text-gray-400 font-mono leading-tight">{score.toFixed(3)}</div>
            )}
          </div>

          {n[4] ? (
            <NeighborCell key={n[4].h3_index} cell={n[4]} />
          ) : (
            <div className="rounded-md bg-gray-800/30 p-1.5" />
          )}

          {/* Row 3: neighbor 5, empty, empty */}
          {n[5] ? (
            <NeighborCell key={n[5].h3_index} cell={n[5]} />
          ) : (
            <div className="rounded-md bg-gray-800/30 p-1.5" />
          )}
          <div className="rounded-md bg-gray-800/30 p-1.5" />
          <div className="rounded-md bg-gray-800/30 p-1.5" />
        </div>
      )}

      {n.length > 0 && (
        <p className="text-[10px] text-gray-600 mt-1.5 text-center">
          {n.filter(x => x.is_anomaly).length} of {n.length} neighbors anomalous
        </p>
      )}
    </div>
  )
}
