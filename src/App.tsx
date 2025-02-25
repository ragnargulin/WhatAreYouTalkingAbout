import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewsFeed from './components/NewsFeed'

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/region/:region" element={<NewsFeed />} />
      </Routes>
    </BrowserRouter>
  )
}