'use client'

import dynamic from 'next/dynamic'
import { AlertSidebar } from '@/components/alerts/AlertSidebar'
import { CellPanel } from '@/components/cell/CellPanel'
import { useStore } from '@/store/useStore'

const WildfireMap = dynamic(
  () => import('@/components/map/WildfireMap').then((m) => ({ default: m.WildfireMap })),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-950" /> }
)

export default function DashboardPage() {
  const { panelOpen, sidebarOpen, toggleSidebar, closePanel } = useStore()

  return (
    <div className="flex flex-1 overflow-hidden h-full relative">
      {/* Map area */}
      <div className="relative flex-1 overflow-hidden">
        <WildfireMap />

        {/* CellPanel */}
        {panelOpen && (
          <div
            className="absolute top-0 h-full w-72 z-10 transition-all duration-300"
            style={{ right: sidebarOpen ? '18rem' : '0' }}
          >
            <CellPanel />
          </div>
        )}

        {/* Mobile backdrop */}
        {(panelOpen || sidebarOpen) && (
          <div
            className="absolute inset-0 z-0 md:hidden"
            onClick={() => {
              if (panelOpen) closePanel()
              else toggleSidebar()
            }}
          />
        )}

        {/* Show alerts button — only visible when sidebar is hidden */}
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute bottom-6 right-3 z-20 bg-gray-900/90 hover:bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-400 hover:text-white transition-colors backdrop-blur-sm flex items-center gap-1.5"
            title="Show alerts"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>
            </svg>
            Alerts
          </button>
        )}
      </div>

      {/* Alert sidebar */}
      <div
        className={`
          shrink-0 overflow-hidden transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-72' : 'w-0'}
          absolute right-0 top-0 h-full z-10
          md:relative md:z-auto
        `}
      >
        <div className="w-72 h-full">
          <AlertSidebar />
        </div>
      </div>
    </div>
  )
}
