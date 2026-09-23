export function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 px-6 py-16 text-center">
      <p className="text-lg font-medium text-slate-200">No matching roles</p>
      <p className="mt-2 text-sm text-slate-500">
        Try clearing filters or broadening your search.
      </p>
    </div>
  )
}
