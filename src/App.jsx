import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NameInputPage from './pages/NameInputPage'
import OverlayPage from './pages/OverlayPage'
import ResultPage from './pages/ResultPage'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [userName, setUserName] = useState('')
  const [selectedOverlay, setSelectedOverlay] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage onSelectImage={setSelectedImage} />}
        />
        <Route
          path="/name"
          element={
            <NameInputPage
              selectedImage={selectedImage}
              onSetName={setUserName}
            />
          }
        />
        <Route
          path="/overlay"
          element={
            <OverlayPage
              selectedImage={selectedImage}
              onSelectOverlay={setSelectedOverlay}
            />
          }
        />
        <Route
          path="/result"
          element={
            <ResultPage
              selectedImage={selectedImage}
              selectedOverlay={selectedOverlay}
              userName={userName}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
