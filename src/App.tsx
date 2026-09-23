import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import { FiltersPanel } from './components/Filters'
import { StatsBar } from './components/StatsBar'
import { JobCard } from './components/JobCard'
import { EmptyState } from './components/EmptyState'
import { useClickedJobs } from './hooks/useClickedJobs'
import { useJobs } from './hooks/useJobs'

export default function App() {
  const {
    data,
    loading,
    error,
    filters,
    setFilters,
    filtered,
    facetOptions,
    stats,
  } = useJobs()
  const { isClicked, markClicked } = useClickedJobs()

  return (
    <div className="min-h-screen">
      <Header generatedAt={data?.generated_at} />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {loading && (
          <p className="text-sm text-slate-400" role="status">
            Loading jobs…
          </p>
        )}

        {error && (
          <div
            className="rounded-xl border border-rose-900/60 bg-rose-950/40 px-4 py-3 text-sm text-rose-200"
            role="alert"
          >
            {error}
          </div>
        )}

        {!loading && !error && data && (
          <>
            <SearchBar
              value={filters.search}
              onChange={(search) => setFilters({ ...filters, search })}
            />

            <FiltersPanel
              filters={filters}
              options={facetOptions}
              onChange={setFilters}
            />

            <StatsBar
              showing={stats.showing}
              total={stats.total}
              remoteAnywhere={stats.remoteAnywhere}
              needsReview={stats.needsReview}
            />

            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {filtered.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    clicked={isClicked(job.id)}
                    onMarkClicked={markClicked}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="mx-auto max-w-6xl border-t border-slate-900 px-4 py-8 text-center text-xs text-slate-600 sm:px-6">
        Curated for Dave Aronmwan · client-side only · no accounts
      </footer>
    </div>
  )
}
