interface Props {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
}

export function SummaryCard({ label, value, sub, accent }: Props) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className={`text-2xl font-bold font-mono ${accent ? 'text-orange-400' : 'text-white'}`}>
        {value}
      </div>
      {sub && <div className="text-xs text-gray-600 mt-0.5">{sub}</div>}
    </div>
  )
}
