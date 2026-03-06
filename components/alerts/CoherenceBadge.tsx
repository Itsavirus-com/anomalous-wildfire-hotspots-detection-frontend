type CoherenceLevel = 'high' | 'medium' | 'low' | 'isolated' | null

const CONFIG: Record<string, { label: string; className: string; title: string }> = {
  high:     { label: 'Widespread heat',  className: 'bg-red-900 text-red-300 border-red-700',          title: 'Unusual heat detected across multiple nearby areas' },
  medium:   { label: 'Spreading heat',   className: 'bg-orange-900 text-orange-300 border-orange-700', title: 'Unusual heat detected in some neighboring areas' },
  low:      { label: 'Limited spread',   className: 'bg-yellow-900 text-yellow-300 border-yellow-700', title: 'Unusual heat mostly contained to this area' },
  isolated: { label: 'Isolated heat',    className: 'bg-gray-700 text-gray-300 border-gray-500',       title: 'No unusual heat detected in surrounding areas' },
}

export function CoherenceBadge({ level }: { level: CoherenceLevel }) {
  if (!level) return null
  const cfg = CONFIG[level] ?? CONFIG.isolated
  return (
    <span
      title={cfg.title}
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border cursor-help ${cfg.className}`}
    >
      {cfg.label}
    </span>
  )
}
