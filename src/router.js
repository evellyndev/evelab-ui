import { useCallback, useEffect, useState } from 'react'
import { experimentBySlug } from './data/experiments.js'

export function resolveRoute(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/'

  if (normalized === '/') {
    return { name: 'catalog' }
  }

  const match = normalized.match(/^\/experiments\/([^/]+)$/)
  const experiment = match ? experimentBySlug[match[1]] : null

  return experiment ? { name: 'experiment', experiment } : { name: 'not-found' }
}

export function useRoute() {
  const [route, setRoute] = useState(() => resolveRoute(window.location.pathname))

  useEffect(() => {
    const onPopState = () => setRoute(resolveRoute(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((path) => {
    if (window.location.pathname === path) return
    window.history.pushState({}, '', path)
    setRoute(resolveRoute(path))
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return { route, navigate }
}
