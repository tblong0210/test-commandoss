import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ListingPage from '../pages/ListingPage'
import TradePage from '../pages/TradePage'
import CreateListingPage from '../pages/CreateListingPage'

const AppRoutes: React.FC = () => (
  <Router>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<ListingPage />} />
          <Route path='/trades' element={<TradePage />} />
          <Route path='/create' element={<CreateListingPage />} />
        </Route>
      </Routes>
    </React.Suspense>
  </Router>
)

export default AppRoutes
