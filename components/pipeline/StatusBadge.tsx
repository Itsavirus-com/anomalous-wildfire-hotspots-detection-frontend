interface Props {
  status: string
}

export function StatusBadge({ status }: Props) {
  const isHealthy = status === 'healthy' || status === 'ok'
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${
        isHealthy
          ? 'bg-green-900/40 text-green-400 border-green-700'
          : 'bg-yellow-900/40 text-yellow-400 border-yellow-700'
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`} />
      {status}
    </span>
  )
}
