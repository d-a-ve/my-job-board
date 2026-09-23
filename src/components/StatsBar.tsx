interface StatsBarProps {
  showing: number
  total: number
  remoteAnywhere: number
  needsReview: number
}

export function StatsBar({
  showing,
  total,
  remoteAnywhere,
  needsReview,
}: StatsBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
      <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-slate-200">
        Showing <strong className="font-semibold text-white">{showing}</strong> of{' '}
        {total}
      </span>
      <span className="rounded-lg border border-emerald-900/50 bg-emerald-950/40 px-3 py-1.5 text-emerald-300">
        {remoteAnywhere} remote-anywhere
      </span>
      <span className="rounded-lg border border-amber-900/50 bg-amber-950/40 px-3 py-1.5 text-amber-300">
        {needsReview} needs review
      </span>
    </div>
  )
}
