import type { ReactNode } from 'react'
import type { Filters as FiltersState } from '../hooks/useJobs'
import { labelSeniority, labelSource, labelWhy } from '../lib/format'

interface FacetOptions {
  sources: string[]
  whyIncluded: string[]
  fitTags: string[]
  seniority: string[]
}

interface FiltersProps {
  filters: FiltersState
  options: FacetOptions
  onChange: (next: FiltersState) => void
}

function toggleSet(set: Set<string>, value: string): Set<string> {
  const next = new Set(set)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return next
}

function Chip({
  active,
  onClick,
  children,
  tone = 'default',
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  tone?: 'default' | 'green' | 'amber'
}) {
  const activeTone =
    tone === 'green'
      ? 'border-emerald-600/70 bg-emerald-950 text-emerald-200'
      : tone === 'amber'
        ? 'border-amber-600/70 bg-amber-950 text-amber-200'
        : 'border-sky-600/70 bg-sky-950 text-sky-200'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
        active
          ? activeTone
          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
      }`}
    >
      {children}
    </button>
  )
}

function Group({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

export function FiltersPanel({ filters, options, onChange }: FiltersProps) {
  const hasActive =
    filters.search ||
    filters.sources.size ||
    filters.whyIncluded.size ||
    filters.fitTags.size ||
    filters.seniority.size ||
    filters.remoteOnly !== null

  return (
    <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-200">Filters</h2>
        {hasActive && (
          <button
            type="button"
            onClick={() =>
              onChange({
                search: filters.search,
                sources: new Set(),
                whyIncluded: new Set(),
                fitTags: new Set(),
                seniority: new Set(),
                remoteOnly: null,
              })
            }
            className="text-xs text-slate-400 underline-offset-2 hover:text-slate-200 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <Group label="Why included">
        {options.whyIncluded.map((w) => (
          <Chip
            key={w}
            active={filters.whyIncluded.has(w)}
            tone={w === 'remote-anywhere' ? 'green' : 'amber'}
            onClick={() =>
              onChange({
                ...filters,
                whyIncluded: toggleSet(filters.whyIncluded, w),
              })
            }
          >
            {labelWhy(w)}
          </Chip>
        ))}
      </Group>

      <Group label="Fit tags">
        {options.fitTags.map((t) => (
          <Chip
            key={t}
            active={filters.fitTags.has(t)}
            onClick={() =>
              onChange({
                ...filters,
                fitTags: toggleSet(filters.fitTags, t),
              })
            }
          >
            {t}
          </Chip>
        ))}
      </Group>

      <Group label="Source">
        {options.sources.map((s) => (
          <Chip
            key={s}
            active={filters.sources.has(s)}
            onClick={() =>
              onChange({
                ...filters,
                sources: toggleSet(filters.sources, s),
              })
            }
          >
            {labelSource(s)}
          </Chip>
        ))}
      </Group>

      <Group label="Seniority">
        {options.seniority.map((s) => (
          <Chip
            key={s}
            active={filters.seniority.has(s)}
            onClick={() =>
              onChange({
                ...filters,
                seniority: toggleSet(filters.seniority, s),
              })
            }
          >
            {labelSeniority(s)}
          </Chip>
        ))}
      </Group>

      <Group label="Remote">
        <Chip
          active={filters.remoteOnly === true}
          onClick={() =>
            onChange({
              ...filters,
              remoteOnly: filters.remoteOnly === true ? null : true,
            })
          }
        >
          Remote only
        </Chip>
        <Chip
          active={filters.remoteOnly === false}
          onClick={() =>
            onChange({
              ...filters,
              remoteOnly: filters.remoteOnly === false ? null : false,
            })
          }
        >
          On-site / hybrid
        </Chip>
      </Group>
    </section>
  )
}
