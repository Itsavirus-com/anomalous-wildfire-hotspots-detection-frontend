'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts'
import { TimeseriesItem } from '@/types/api'
import { format } from 'date-fns'

interface Props {
  data: TimeseriesItem[]
}

export function TimeseriesChart({ data }: Props) {
  const formatted = data.map((d) => ({
    date: format(new Date(d.date), 'MMM d'),
    hotspots: d.hotspot_count,
    score: d.anomaly_score != null ? parseFloat(d.anomaly_score.toFixed(3)) : null,
    anomaly: d.is_anomaly,
  }))

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={formatted} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: '#6b7280' }}
          interval="preserveStartEnd"
        />
        <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#6b7280' }} />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          domain={['auto', 'auto']}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: 6 }}
          labelStyle={{ color: '#f9fafb', fontSize: 11 }}
          itemStyle={{ fontSize: 11 }}
        />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
        <ReferenceLine yAxisId="right" y={0} stroke="#374151" strokeDasharray="3 3" />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="hotspots"
          stroke="#f97316"
          strokeWidth={1.5}
          dot={false}
          name="Hotspots"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="score"
          stroke="#60a5fa"
          strokeWidth={1}
          dot={false}
          name="Anomaly Score"
          strokeDasharray="4 2"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
