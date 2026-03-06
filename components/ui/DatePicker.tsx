'use client'

import { useDates } from '@/hooks/useDates'
import { useStore } from '@/store/useStore'
import { format } from 'date-fns'

export function DatePicker() {
  const { data, isLoading } = useDates()
  const { selectedDate, setSelectedDate } = useStore()

  const dates = data?.dates ?? []
  const currentDate = selectedDate ?? data?.latest ?? ''
  const currentIndex = dates.indexOf(currentDate)
  const activeIndex = currentIndex === -1 ? dates.length - 1 : currentIndex

  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    const idx = Number(e.target.value)
    if (dates[idx]) setSelectedDate(dates[idx])
  }

  if (isLoading) {
    return <div className="h-8 w-48 bg-gray-700 animate-pulse rounded" />
  }

  if (!dates.length) return null

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-0.5 min-w-[140px]">
        <span className="text-xs text-gray-400 leading-none">Date</span>
        <span className="text-sm font-semibold text-white leading-none">
          {currentDate ? format(new Date(currentDate), 'MMM d, yyyy') : '—'}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => activeIndex > 0 && setSelectedDate(dates[activeIndex - 1])}
          disabled={activeIndex === 0}
          className="text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-base leading-none px-0.5"
          title="Previous day"
        >
          ‹
        </button>
        <input
          type="range"
          min={0}
          max={dates.length - 1}
          value={activeIndex}
          onChange={handleSlider}
          className="w-32 accent-orange-500 cursor-pointer"
          title={currentDate}
        />
        <button
          onClick={() => activeIndex < dates.length - 1 && setSelectedDate(dates[activeIndex + 1])}
          disabled={activeIndex === dates.length - 1}
          className="text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-base leading-none px-0.5"
          title="Next day"
        >
          ›
        </button>
      </div>
    </div>
  )
}
