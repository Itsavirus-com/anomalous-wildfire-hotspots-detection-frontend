// TypeScript interfaces matching Pydantic schemas in the FastAPI backend

// ─── Alerts ──────────────────────────────────────────────────────────────────

export interface AlertItem {
  rank: number
  h3_index: string
  date: string
  anomaly_score: number
  hybrid_score: number
  spatial_coherence_level: 'high' | 'medium' | 'low' | 'isolated' | null
  coherence_reasons: string[] | null
  needs_manual_review: boolean
  hotspot_count: number | null
  total_frp: number | null
  ratio_vs_7d_avg: number | null
  neighbor_activity: number | null
  center_lat: number | null
  center_lng: number | null
  province: string | null
  regency: string | null
}

export interface AlertsResponse {
  date: string
  total_alerts: number
  alerts: AlertItem[]
}

export interface AlertHistoryItem {
  date: string
  rank: number
  hybrid_score: number
  spatial_coherence_level: string | null
}

export interface AlertHistoryResponse {
  h3_index: string
  province: string | null
  regency: string | null
  total_alerts: number
  alerts: AlertHistoryItem[]
}

// ─── Map ─────────────────────────────────────────────────────────────────────

export interface MapCell {
  h3_index: string
  anomaly_score: number
  is_anomaly: boolean
  hotspot_count: number | null
  total_frp: number | null
  center_lat: number
  center_lng: number
  province: string | null
}

export interface MapResponse {
  date: string
  total_cells: number
  anomaly_count: number
  cells: MapCell[]
}

export interface MapDatesResponse {
  dates: string[]
  total: number
  earliest: string | null
  latest: string | null
}

// ─── Cells ───────────────────────────────────────────────────────────────────

export interface CellAggregate {
  hotspot_count: number
  total_frp: number | null
  max_frp: number | null
  avg_frp: number | null
}

export interface CellFeatures {
  delta_count_vs_prev_day: number | null
  ratio_vs_7d_avg: number | null
  neighbor_activity: number | null
}

export interface CellScore {
  anomaly_score: number
  is_anomaly: boolean
  model_version: string
}

export interface CellAlert {
  rank: number
  hybrid_score: number
  spatial_coherence_level: string | null
  needs_manual_review: boolean
}

export interface CellDetail {
  h3_index: string
  date: string
  center_lat: number
  center_lng: number
  province: string | null
  regency: string | null
  district: string | null
  aggregate: CellAggregate | null
  features: CellFeatures | null
  score: CellScore | null
  alert: CellAlert | null
}

export interface TimeseriesItem {
  date: string
  hotspot_count: number
  total_frp: number | null
  is_anomaly: boolean | null
  anomaly_score: number | null
}

export interface CellTimeseriesResponse {
  h3_index: string
  province: string | null
  regency: string | null
  days: number
  timeseries: TimeseriesItem[]
}

export interface NeighborCell {
  h3_index: string
  hotspot_count: number | null
  is_anomaly: boolean | null
  anomaly_score: number | null
  center_lat: number
  center_lng: number
}

export interface CellNeighborsResponse {
  h3_index: string
  date: string
  active_neighbor_count: number
  anomalous_neighbor_count: number
  neighbors: NeighborCell[]
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export interface DatabaseStats {
  total_hotspots: number
  total_cell_days: number
  unique_cells: number
  date_range_start: string | null
  date_range_end: string | null
}

export interface ModelStats {
  version: string
  trained_at: string | null
  training_samples: number | null
  contamination: number | null
}

export interface AlertStats {
  total: number
  high_coherence: number
  medium_coherence: number
  low_coherence: number
  isolated: number
  needs_review: number
}

export interface StatsResponse {
  database: DatabaseStats
  model: ModelStats
  alerts: AlertStats
}

export interface DailyStatItem {
  date: string
  total_hotspots: number
  active_cells: number
  anomalies_detected: number
  alerts_selected: number
  top_alert_score: number | null
}

export interface DailyStatsResponse {
  start: string | null
  end: string | null
  days: DailyStatItem[]
}

// ─── Pipeline ────────────────────────────────────────────────────────────────

export interface PipelineStatus {
  status: string
  latest_data_date: string | null
  total_hotspots: number
  total_scored: number
  total_alerts: number
  model_version: string | null
}

export interface ScoreRequest {
  date: string
}

export interface ScoreResponse {
  status: string
  date: string
  scored: number
  message: string
}
