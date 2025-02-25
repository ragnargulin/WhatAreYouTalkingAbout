import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewsFeed from './components/NewsFeed'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/article/:articleId" element={<NewsFeed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App