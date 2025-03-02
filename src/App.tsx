// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import NewsFeed from './components/NewsFeed'
import AboutPage from './pages/AboutPage'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1a1a1a;  // Dark background
`

const MainContent = styled.main`
  flex: 1;
`

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<NewsFeed />} />
            <Route path="/region/:region" element={<NewsFeed />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  )
}

export default App