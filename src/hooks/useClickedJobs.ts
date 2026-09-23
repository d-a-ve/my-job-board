import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'job-board:clicked-ids'

function readClickedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(
      parsed.filter((id): id is string => typeof id === 'string' && id.length > 0),
    )
  } catch {
    return new Set()
  }
}

function writeClickedIds(ids: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
  } catch {
    // Quota or private mode: the in-memory set still marks this session.
  }
}

export function useClickedJobs() {
  const [clickedIds, setClickedIds] = useState<Set<string>>(readClickedIds)

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return
      setClickedIds(readClickedIds())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const markClicked = useCallback((id: string) => {
    setClickedIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      writeClickedIds(next)
      return next
    })
  }, [])

  const isClicked = useCallback(
    (id: string) => clickedIds.has(id),
    [clickedIds],
  )

  return { isClicked, markClicked }
}
