'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { DailyStatItem } from '@/types/api'
import { format } from 'date-fns'

interface Props {
  data: DailyStatItem[]
}

export function DailyTrendChart({ data }: Props) {
  const formatted = data.map((d) => ({
    date: format(new Date(d.date), 'MMM d'),
    anomalies: d.anomalies_detected,
    alerts: d.alerts_selected,
    hotspots: d.total_hotspots,
  }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={formatted} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: '#6b7280' }}
          interval={Math.floor(formatted.length / 10)}
        />
        <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: 6 }}
          labelStyle={{ color: '#f9fafb', fontSize: 12 }}
          itemStyle={{ fontSize: 12 }}
        />
        <Bar dataKey="anomalies" name="Anomalies" fill="#f97316" radius={[2, 2, 0, 0]} />
        <Bar dataKey="alerts" name="Alerts" fill="#dc2626" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
