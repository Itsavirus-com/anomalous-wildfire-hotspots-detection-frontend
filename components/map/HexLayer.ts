import { H3HexagonLayer } from '@deck.gl/geo-layers'
import { MapCell } from '@/types/api'

function scoreToColor(cell: MapCell): [number, number, number, number] {
  if (!cell.is_anomaly) return [80, 95, 115, 200]  // gray — brighter + more opaque

  const score = cell.anomaly_score
  if (score < -0.10) return [220, 38, 38, 255]    // red — strong
  if (score < -0.05) return [249, 115, 22, 255]   // orange — moderate
  if (score < 0.00) return [245, 158, 11, 240]   // amber — mild
  return [80, 95, 115, 200]
}

function cellElevation(cell: MapCell): number {
  if (!cell.is_anomaly) return 0
  // Scale elevation by hotspot count for dramatic 3D spikes
  const base = Math.abs(cell.anomaly_score) * 100000
  const count = cell.hotspot_count ?? 1
  return base * Math.sqrt(count)
}

export function buildHexLayer(
  cells: MapCell[],
  onCellClick: (h3Index: string) => void
) {
  return new H3HexagonLayer({
    id: 'hex-layer',
    data: cells,
    getHexagon: (d: MapCell) => d.h3_index,
    getFillColor: (d: MapCell) => scoreToColor(d),
    getElevation: (d: MapCell) => cellElevation(d),
    extruded: true,
    coverage: 0.92,
    elevationScale: 1,
    stroked: true,
    getLineColor: [255, 255, 255, 30],
    lineWidthMinPixels: 1,
    pickable: true,
    onClick: ({ object }: { object: MapCell }) => {
      if (object) onCellClick(object.h3_index)
    },
    updateTriggers: {
      getFillColor: cells,
      getElevation: cells,
    },
  })
}
