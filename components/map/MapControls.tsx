'use client'

import { DatePicker } from '@/components/ui/DatePicker'
import { useMapData } from '@/hooks/useMapData'
import { useStore } from '@/store/useStore'

export function MapControls() {
  const { selectedDate } = useStore()
  const { data } = useMapData(selectedDate)

  return (
    <div className="absolute top-3 left-3 z-10 flex items-center gap-3 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 shadow-lg">
      <DatePicker />
      {data && (
        <div className="flex items-center gap-3 pl-2 border-l border-gray-700">
          <div className="text-center" title="Total grid areas monitored on this date">
            <div className="text-xs font-semibold text-white">{data.total_cells}</div>
            <div className="text-xs text-gray-500">Areas</div>
          </div>
          <div className="text-center" title="Areas with unusual heat activity detected">
            <div className="text-xs font-semibold text-red-400">{data.anomaly_count}</div>
            <div className="text-xs text-gray-500">Unusual</div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-1.5 pl-2 border-l border-gray-700">
        <span className="text-xs text-gray-600 mr-0.5">Heat anomaly:</span>
        {[
          { color: 'bg-red-600',    label: 'Critical', title: 'Very unusual heat intensity — far above historical average' },
          { color: 'bg-orange-500', label: 'High',     title: 'Significantly above normal heat levels' },
          { color: 'bg-amber-500',  label: 'Elevated', title: 'Slightly above normal heat levels' },
          { color: 'bg-gray-600',   label: 'Normal',   title: 'No unusual heat activity detected' },
        ].map(({ color, label, title }) => (
          <div key={label} className="flex items-center gap-0.5 cursor-help" title={title}>
            <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
            <span className="text-xs text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
