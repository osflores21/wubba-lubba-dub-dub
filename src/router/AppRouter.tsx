import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '../components/Layout/AppLayout'
import Home from '../pages/Home'
import Favorites from '../pages/Favorites'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
