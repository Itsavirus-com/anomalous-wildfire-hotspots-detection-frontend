'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AlertStats } from '@/types/api'

const COLORS = {
  high:     '#dc2626',
  medium:   '#f97316',
  low:      '#f59e0b',
  isolated: '#6b7280',
}

interface Props {
  stats: AlertStats
}

export function CoherenceDonut({ stats }: Props) {
  const data = [
    { name: 'High',     value: stats.high_coherence,   color: COLORS.high },
    { name: 'Medium',   value: stats.medium_coherence, color: COLORS.medium },
    { name: 'Low',      value: stats.low_coherence,    color: COLORS.low },
    { name: 'Isolated', value: stats.isolated,          color: COLORS.isolated },
  ].filter((d) => d.value > 0)

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: 6 }}
          labelStyle={{ color: '#f9fafb', fontSize: 12 }}
          itemStyle={{ fontSize: 12 }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
