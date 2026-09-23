export type WhyIncluded = 'remote-anywhere' | 'needs_review'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  remote: boolean
  visa_sponsorship: string
  fit_tags: string[]
  seniority: string
  posted: string
  source: string
  url: string
  snippet: string
  why_included: WhyIncluded
}

export interface Candidate {
  summary: string
  skills: string[]
  constraints: string[]
}

export interface JobsData {
  generated_at: string
  candidate: Candidate
  jobs: Job[]
}
