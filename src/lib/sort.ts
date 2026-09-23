import type { Job } from '../types/job'

export function sortJobs(jobs: Job[]): Job[] {
  return [...jobs].sort((a, b) => {
    const aRemote = a.why_included === 'remote-anywhere' ? 0 : 1
    const bRemote = b.why_included === 'remote-anywhere' ? 0 : 1
    if (aRemote !== bRemote) return aRemote - bRemote

    const aPosted = a.posted?.trim() || ''
    const bPosted = b.posted?.trim() || ''
    if (!aPosted && !bPosted) return 0
    if (!aPosted) return 1
    if (!bPosted) return -1
    return bPosted.localeCompare(aPosted)
  })
}
