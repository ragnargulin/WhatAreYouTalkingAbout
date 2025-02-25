import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewsFeed from './components/NewsFeed.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsFeed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App