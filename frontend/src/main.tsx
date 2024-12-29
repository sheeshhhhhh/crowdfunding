import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import AuthContextProvider from './context/AuthContext'
import SocketProvider from './context/SocketContext'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const queryClient = new QueryClient()

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <SocketProvider>
            <RouterProvider router={router} />
            <Toaster />
          </SocketProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}