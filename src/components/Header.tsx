import { formatGeneratedAt } from '../lib/format'

interface HeaderProps {
  generatedAt?: string
}

export function Header({ generatedAt }: HeaderProps) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/90">
              Personal board
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Dave&apos;s Job Board
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              React · TypeScript · Node · React Native · remote worldwide or visa
              sponsorship
            </p>
          </div>
          {generatedAt && (
            <p className="shrink-0 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-400">
              Data as of{' '}
              <span className="text-slate-200">{formatGeneratedAt(generatedAt)}</span>
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
