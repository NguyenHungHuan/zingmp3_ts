import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AppProvider } from './contexts/app.context'
import { SkeletonTheme } from 'react-loading-skeleton'
import ErrorBoundary from '~/components/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SkeletonTheme
      baseColor='#ffffff1a'
      customHighlightBackground='linear-gradient(90deg, transparent, #ffffff1a, transparent)'
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <ErrorBoundary>
              <HelmetProvider>
                <App />
              </HelmetProvider>
            </ErrorBoundary>
          </AppProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </SkeletonTheme>
  </React.StrictMode>
)
