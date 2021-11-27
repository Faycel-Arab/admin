import React, { useState, useContext } from 'react'
import logo from './logo.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Navigate
} from "react-router-dom"
import { useAuth } from './features/auth'
import PageContainer from './pages/PageContainer'
import Login from './pages/Login'
import Notifications from './pages/Notifications'
import Restaurants from './pages/Restaurants'

function RequireAuth({ children }: { children: JSX.Element }) {
  let {user} = useAuth()
  let location = useLocation()

  if (!user) return <Navigate to="/login" state={{ from: location }} />

  return children;
}

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/Restaurants'
            element={<RequireAuth><PageContainer><Restaurants /></PageContainer></RequireAuth>}
          />
          <Route
            path='/'
            element={<RequireAuth><PageContainer><Restaurants /></PageContainer></RequireAuth>}
          />
          <Route
            path='/Notifications'
            element={<RequireAuth><PageContainer><Notifications /></PageContainer></RequireAuth>}
          />
        </Routes>
      </BrowserRouter>
  )
}

export default App
