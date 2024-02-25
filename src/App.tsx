import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Home } from './pages/home/Home'
import { Toaster } from './components/ui/toaster'
import { Route, Routes } from 'react-router-dom'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route index element={ <Home /> } />
          <Route path='/home' element={ <Home /> } />
          <Route path='/tasks' element={ <Home /> } />
        </Routes>
      </QueryClientProvider>
      <Toaster />
    </>
  )
}

export default App
