import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Home } from './pages/home/Home'
import { Toaster } from './components/ui/toaster'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
      <Toaster />
    </>
  )
}

export default App
