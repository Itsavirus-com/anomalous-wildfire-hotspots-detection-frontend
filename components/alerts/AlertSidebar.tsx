'use client'

import { useAlerts } from '@/hooks/useAlerts'
import { useStore } from '@/store/useStore'
import { AlertCard } from './AlertCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'

export function AlertSidebar() {
  const { selectedDate, selectedCell } = useStore()
  const { data, error, isLoading } = useAlerts(selectedDate)

  return (
    <div className="flex flex-col h-full bg-gray-900 border-l border-gray-700">
      <div className="px-4 py-3 border-b border-gray-700 shrink-0">
        <h2 className="text-sm font-semibold text-white">Alerts</h2>
        {data && (
          <p className="text-xs text-gray-500 mt-0.5">
            {data.total_alerts} alerts · {data.date}
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message="Could not load alerts" />}
        {data?.alerts.map((alert) => (
          <AlertCard
            key={alert.h3_index}
            alert={alert}
            isSelected={selectedCell === alert.h3_index}
          />
        ))}
      </div>
    </div>
  )
}
