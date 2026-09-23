import { useEffect, useMemo, useState } from 'react'
import type { Job, JobsData } from '../types/job'
import { sortJobs } from '../lib/sort'

export interface Filters {
  search: string
  sources: Set<string>
  whyIncluded: Set<string>
  fitTags: Set<string>
  seniority: Set<string>
  remoteOnly: boolean | null
}

export const defaultFilters = (): Filters => ({
  search: '',
  sources: new Set(),
  whyIncluded: new Set(),
  fitTags: new Set(),
  seniority: new Set(),
  remoteOnly: null,
})

function matchesSearch(job: Job, q: string): boolean {
  if (!q) return true
  const hay = [
    job.title,
    job.company,
    job.location,
    job.snippet,
    ...(job.fit_tags ?? []),
  ]
    .join(' ')
    .toLowerCase()
  return hay.includes(q)
}

export function useJobs() {
  const [data, setData] = useState<JobsData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  useEffect(() => {
    let cancelled = false
    fetch('/jobs.json')
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load jobs (${r.status})`)
        return r.json() as Promise<JobsData>
      })
      .then((json) => {
        if (!cancelled) {
          setData(json)
          setLoading(false)
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load jobs')
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const allJobs = data?.jobs ?? []

  const facetOptions = useMemo(() => {
    const sources = new Set<string>()
    const why = new Set<string>()
    const tags = new Set<string>()
    const seniority = new Set<string>()
    for (const j of allJobs) {
      if (j.source) sources.add(j.source)
      if (j.why_included) why.add(j.why_included)
      for (const t of j.fit_tags ?? []) tags.add(t)
      if (j.seniority) seniority.add(j.seniority)
    }
    return {
      sources: [...sources].sort(),
      whyIncluded: [...why].sort(),
      fitTags: [...tags].sort(),
      seniority: [...seniority].sort(),
    }
  }, [allJobs])

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase()
    const result = allJobs.filter((job) => {
      if (!matchesSearch(job, q)) return false
      if (filters.sources.size && !filters.sources.has(job.source)) return false
      if (filters.whyIncluded.size && !filters.whyIncluded.has(job.why_included))
        return false
      if (filters.fitTags.size) {
        const tags = job.fit_tags ?? []
        let hit = false
        for (const t of filters.fitTags) {
          if (tags.includes(t)) {
            hit = true
            break
          }
        }
        if (!hit) return false
      }
      if (filters.seniority.size && !filters.seniority.has(job.seniority))
        return false
      if (filters.remoteOnly === true && !job.remote) return false
      if (filters.remoteOnly === false && job.remote) return false
      return true
    })
    return sortJobs(result)
  }, [allJobs, filters])

  const stats = useMemo(() => {
    const remoteAnywhere = filtered.filter(
      (j) => j.why_included === 'remote-anywhere',
    ).length
    const needsReview = filtered.filter(
      (j) => j.why_included === 'needs_review',
    ).length
    return {
      showing: filtered.length,
      total: allJobs.length,
      remoteAnywhere,
      needsReview,
    }
  }, [filtered, allJobs])

  return {
    data,
    loading,
    error,
    filters,
    setFilters,
    filtered,
    facetOptions,
    stats,
  }
}
