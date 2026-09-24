import type { Job } from '../types/job'
import {
  formatPosted,
  labelSeniority,
  labelSource,
  labelWhy,
} from '../lib/format'

interface JobCardProps {
  job: Job
  clicked: boolean
  onMarkClicked: (id: string) => void
}

export function JobCard({ job, clicked, onMarkClicked }: JobCardProps) {
  const isRemoteAnywhere = job.why_included === 'remote-anywhere'

  const markOpened = () => {
    onMarkClicked(job.id)
  }

  return (
    <article className="group flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700 hover:bg-slate-900/80">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <h3 className="text-lg font-semibold leading-snug text-slate-50">
            {job.title}
          </h3>
          <p className="text-sm text-slate-300">
            <span className="font-medium text-slate-200">{job.company}</span>
            <span className="text-slate-600"> · </span>
            <span>{job.location}</span>
            {job.remote && (
              <>
                <span className="text-slate-600"> · </span>
                <span className="text-emerald-400/90">Remote</span>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {clicked && (
            <span className="rounded-full border border-sky-700/60 bg-sky-950/70 px-2.5 py-0.5 text-xs font-medium text-sky-300">
              Clicked
            </span>
          )}
          <span className="rounded-full border border-slate-700 bg-slate-950/60 px-2.5 py-0.5 text-xs text-slate-300">
            {labelSource(job.source)}
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
              isRemoteAnywhere
                ? 'border-emerald-700/60 bg-emerald-950/70 text-emerald-300'
                : 'border-amber-700/60 bg-amber-950/70 text-amber-300'
            }`}
          >
            {labelWhy(job.why_included)}
          </span>
        </div>
      </div>

      {(job.fit_tags?.length ?? 0) > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.fit_tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-sky-300/90"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        <span>Seniority: {labelSeniority(job.seniority)}</span>
        <span>Posted: {formatPosted(job.posted)}</span>
      </div>

      {job.snippet && (
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-400">
          {job.snippet}
        </p>
      )}

      <div className="mt-auto pt-1">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={markOpened}
          onAuxClick={markOpened}
          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-800/60 bg-emerald-950/40 px-3 py-2 text-sm font-medium text-emerald-300 transition hover:border-emerald-600 hover:bg-emerald-950 hover:text-emerald-200"
        >
          Open listing
          <svg
            className="h-3.5 w-3.5 opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path
              d="M7 17L17 7M9 7h8v8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </article>
  )
}
