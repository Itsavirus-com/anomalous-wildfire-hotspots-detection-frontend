export function ErrorMessage({ message }: { message?: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center text-red-400">
        <div className="text-2xl mb-2">⚠</div>
        <div className="text-sm">{message || 'Failed to load data'}</div>
      </div>
    </div>
  )
}
