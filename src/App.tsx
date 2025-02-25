import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewsFeed from './components/NewsFeed'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/region/:region" element={<NewsFeed />} />
      </Routes>
    </BrowserRouter>
  )
}