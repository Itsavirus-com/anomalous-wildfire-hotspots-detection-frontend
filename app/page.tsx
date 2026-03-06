'use client'

import dynamic from 'next/dynamic'
import { AlertSidebar } from '@/components/alerts/AlertSidebar'
import { CellPanel } from '@/components/cell/CellPanel'
import { useStore } from '@/store/useStore'

// Dynamically import the map (no SSR — deck.gl uses WebGL)
const WildfireMap = dynamic(
  () => import('@/components/map/WildfireMap').then((m) => ({ default: m.WildfireMap })),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-950" /> }
)

export default function DashboardPage() {
  const { panelOpen } = useStore()

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Map area — takes remaining space */}
      <div className="relative flex-1 overflow-hidden">
        <WildfireMap />
        {/* Cell detail slide-in panel */}
        {panelOpen && <CellPanel />}
      </div>

      {/* Alert sidebar */}
      <div className="w-72 shrink-0 overflow-hidden">
        <AlertSidebar />
      </div>
    </div>
  )
}
