import { useQuery } from '@tanstack/react-query'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import RegisterPage from './pages/auth/RegisterPage'
import ProtectedRoute from './pages/auth/ProtectedRoute'
import ProtectedAdmin from './pages/auth/ProtectedAdmin'
import AdminPage from './pages/dashboard/admin/AdminPage'
import Sales from './pages/dashboard/SalesPage'
function App() {

 
  return (
      <>
          <Routes>
            <Route path='/login' element={< LoginPage /> } />
            <Route path='/' element={< LoginPage /> } />
            <Route path='/register' element={< RegisterPage /> } />
            <Route path='/dashboard' element={<ProtectedRoute >< DashboardPage /> </ProtectedRoute>} />
            <Route path='/sales' element={<ProtectedRoute >< Sales /> </ProtectedRoute>} />
            <Route path='/admin' element={<ProtectedAdmin > <AdminPage /> </ProtectedAdmin>} />
          </Routes>
      </>
  )
}

export default App
