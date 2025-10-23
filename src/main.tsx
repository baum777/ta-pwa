import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  },
})

// Service Worker registration (production only)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  // Use workbox-window for update notifications
  import('virtual:pwa-register').then(({ registerSW }) => {
    const updateSW = registerSW({
      onNeedRefresh() {
        if (
          confirm(
            'New version available! Click OK to reload and update the app.'
          )
        ) {
          updateSW(true)
        }
      },
      onOfflineReady() {
        console.log('App ready to work offline')
      },
    })
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
