export function formatGeneratedAt(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    })
  } catch {
    return iso
  }
}

export function formatPosted(posted: string): string {
  if (!posted?.trim()) return 'Date unknown'
  try {
    const d = new Date(posted + 'T00:00:00')
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return posted
  }
}

export function labelSource(source: string): string {
  const map: Record<string, string> = {
    remotive: 'Remotive',
    remoteok: 'RemoteOK',
    linkedin: 'LinkedIn',
    wwr: 'We Work Remotely',
    other: 'Other',
  }
  return map[source] ?? source
}

export function labelWhy(why: string): string {
  if (why === 'remote-anywhere') return 'Remote anywhere'
  if (why === 'needs_review') return 'Needs review'
  return why
}

export function labelSeniority(s: string): string {
  const map: Record<string, string> = {
    mid: 'Mid',
    'mid-senior': 'Mid–Senior',
    senior: 'Senior',
    junior: 'Junior',
  }
  return map[s] ?? s
}
