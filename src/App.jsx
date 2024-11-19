import './App.css'
import LandingPage from './Components/LandingPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import InvitationPage from './Components/InvitationPage';

function App() {

  return (
    <Router>
      <Suspense fallback="Loding.....">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/invite" element={<InvitationPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
