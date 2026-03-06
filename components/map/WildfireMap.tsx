'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Map, useControl, useMap } from 'react-map-gl/maplibre'
import { MapboxOverlay } from '@deck.gl/mapbox'
import { MapCell } from '@/types/api'
import { useMapData } from '@/hooks/useMapData'
import { useStore } from '@/store/useStore'
import { buildHexLayer } from './HexLayer'
import { MapControls } from './MapControls'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import 'maplibre-gl/dist/maplibre-gl.css'

const INITIAL_VIEW_STATE = {
  longitude: 117.5,
  latitude: -2.5,
  zoom: 6,
  pitch: 40,
  bearing: 0,
}

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

function getNasaGibsTileUrl(date: string | null): string {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const d = date ?? yesterday.toISOString().split('T')[0]
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/${d}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`
}

interface HoverInfo {
  x: number
  y: number
  cell: MapCell
}

function FlyController() {
  const { flyTarget, clearFlyTarget } = useStore()
  const { current: map } = useMap()

  useEffect(() => {
    if (!flyTarget || !map) return
    map.flyTo({ center: [flyTarget.longitude, flyTarget.latitude], zoom: 9, duration: 1200 })
    clearFlyTarget()
  }, [flyTarget, map, clearFlyTarget])

  return null
}

function DeckGLOverlay({
  layers,
  onHover,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layers: any[]
  onHover: (info: HoverInfo | null) => void
}) {
  const overlay = useControl<MapboxOverlay>(
    () =>
      new MapboxOverlay({
        interleaved: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onHover: (info: any) => {
          if (info.object) {
            onHover({ x: info.x, y: info.y, cell: info.object as MapCell })
          } else {
            onHover(null)
          }
        },
      })
  )
  overlay.setProps({ layers })
  return null
}

function SatelliteLayer({ date }: { date: string | null }) {
  const { current: mapRef } = useMap()

  useEffect(() => {
    const map = mapRef?.getMap()
    if (!map) return

    const tileUrl = getNasaGibsTileUrl(date)

    const addLayers = () => {
      if (!map.getSource('nasa-gibs')) {
        map.addSource('nasa-gibs', {
          type: 'raster',
          tiles: [tileUrl],
          tileSize: 256,
          maxzoom: 9,
          attribution: 'NASA GIBS / VIIRS SNPP',
        })
      }
      if (!map.getLayer('satellite-layer')) {
        map.addLayer(
          { id: 'satellite-layer', type: 'raster', source: 'nasa-gibs', paint: { 'raster-opacity': 0.8 } },
          map.getLayer('water') ? 'water' : undefined
        )
      }
    }

    if (map.isStyleLoaded()) {
      addLayers()
    } else {
      map.once('load', addLayers)
    }

    return () => {
      if (map.getLayer('satellite-layer')) map.removeLayer('satellite-layer')
      if (map.getSource('nasa-gibs')) map.removeSource('nasa-gibs')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef, date])

  return null
}

export function WildfireMap() {
  const { selectedDate, openCell, showSatellite } = useStore()
  const { data, isLoading } = useMapData(selectedDate)
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null)

  const handleCellClick = useCallback(
    (h3Index: string) => openCell(h3Index),
    [openCell]
  )

  const layers = useMemo(() => {
    if (!data?.cells?.length) return []
    return [buildHexLayer(data.cells, handleCellClick)]
  }, [data?.cells, handleCellClick])

  return (
    <div className="relative w-full h-full">
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={MAP_STYLE}
        attributionControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        {showSatellite && <SatelliteLayer date={selectedDate} />}
        <DeckGLOverlay layers={layers} onHover={setHoverInfo} />
        <FlyController />
      </Map>

      <MapControls />

      {hoverInfo && (
        <div
          className="absolute z-20 pointer-events-none bg-gray-900/95 border border-gray-600 rounded-lg px-3 py-2 text-xs shadow-xl"
          style={{ left: hoverInfo.x + 12, top: hoverInfo.y - 10 }}
        >
          <div className="text-gray-400 font-mono mb-1">{hoverInfo.cell.h3_index.slice(0, 15)}…</div>
          {hoverInfo.cell.province && (
            <div className="text-white mb-0.5">{hoverInfo.cell.province}</div>
          )}
          <div className="text-gray-300">
            Score:{' '}
            <span className="text-orange-400 font-mono">{hoverInfo.cell.anomaly_score.toFixed(4)}</span>
          </div>
          {hoverInfo.cell.hotspot_count != null && (
            <div className="text-gray-300">
              Hotspots: <span className="text-white">{hoverInfo.cell.hotspot_count}</span>
            </div>
          )}
          <div className={`mt-0.5 font-semibold ${hoverInfo.cell.is_anomaly ? 'text-red-400' : 'text-gray-500'}`}>
            {hoverInfo.cell.is_anomaly ? '⚠ Anomaly' : 'Normal'}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none z-10">
          <LoadingSpinner size="lg" />
        </div>
      )}
    </div>
  )
}
