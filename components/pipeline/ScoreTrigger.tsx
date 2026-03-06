'use client'

import { useState } from 'react'
import { ScoreResponse } from '@/types/api'

interface Props {
  onScored?: () => void
}

export function ScoreTrigger({ onScored }: Props) {
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScoreResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRun = async () => {
    if (!date) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/proxy/pipeline/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date }),
      })
      if (!res.ok) {
        const err = await res.json()
        setError(err.detail || 'Pipeline run failed')
      } else {
        const data: ScoreResponse = await res.json()
        setResult(data)
        onScored?.()
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 space-y-4">
      <h3 className="text-sm font-semibold text-white">Trigger Re-Score</h3>
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="text-xs text-gray-500 block mb-1">Date (YYYY-MM-DD)</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
          />
        </div>
        <button
          onClick={handleRun}
          disabled={!date || loading}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm rounded font-semibold transition-colors"
        >
          {loading ? 'Running…' : 'Run Pipeline'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded px-3 py-2 text-sm text-red-400">
          {error}
        </div>
      )}
      {result && (
        <div className="bg-green-900/30 border border-green-700 rounded px-3 py-2 text-sm text-green-400">
          ✓ {result.message} — {result.scored} records scored for {result.date}
        </div>
      )}
    </div>
  )
}
