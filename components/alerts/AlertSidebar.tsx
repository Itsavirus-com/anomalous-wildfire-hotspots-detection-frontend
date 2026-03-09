'use client'

import { useAlerts } from '@/hooks/useAlerts'
import { useStore } from '@/store/useStore'
import { AlertCard } from './AlertCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'

export function AlertSidebar() {
  const { selectedDate, selectedCell, toggleSidebar } = useStore()
  const { data, error, isLoading } = useAlerts(selectedDate)

  return (
    <div className="flex flex-col h-full bg-gray-900 border-l border-gray-700">
      <div className="px-4 py-3 border-b border-gray-700 shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Alerts</h2>
          {data && (
            <p className="text-xs text-gray-500 mt-0.5">
              {data.total_alerts} alerts · {data.date}
            </p>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          title="Hide sidebar"
          className="text-gray-500 hover:text-white transition-colors p-1 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>
          </svg>
        </button>
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
