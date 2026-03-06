// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare module '@deck.gl/react' {
  import { ComponentType } from 'react'

  export interface DeckGLProps {
    initialViewState?: object
    viewState?: object
    onViewStateChange?: (params: { viewState: any; interactionState?: any; oldViewState?: any }) => void
    controller?: boolean | object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layers?: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onHover?: (info: any) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: (info: any) => void
    style?: React.CSSProperties
    children?: React.ReactNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ContextProvider?: any
  }

  const DeckGL: ComponentType<DeckGLProps>
  export default DeckGL
}

declare module '@deck.gl/geo-layers' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export class H3HexagonLayer<D = any> {
    constructor(props: {
      id?: string
      data?: D[]
      getHexagon?: (d: D) => string
      getFillColor?: (d: D) => [number, number, number, number]
      getElevation?: (d: D) => number
      extruded?: boolean
      coverage?: number
      highPrecision?: boolean
      elevationScale?: number
      stroked?: boolean
      getLineColor?: [number, number, number, number]
      lineWidthMinPixels?: number
      pickable?: boolean
      onClick?: (info: { object: D }) => void
      updateTriggers?: Record<string, unknown>
    })
  }
}
declare module '@deck.gl/mapbox' {
  export interface MapboxOverlayProps {
    interleaved?: boolean
    layers?: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onHover?: (info: any) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: (info: any) => void
  }

  export class MapboxOverlay {
    constructor(props: MapboxOverlayProps)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setProps(props: Partial<MapboxOverlayProps>): void
    onAdd(map: any): HTMLElement
    onRemove(): void
  }
}
