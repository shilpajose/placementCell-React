import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Auth from './Pages/Auth'
import AdminDashboard from './Pages/AdminDashboard'
import Admintables from './Pages/Admintables'
import EditPlacements from './Components/EditPlacements'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/login' element={<Auth/>}></Route>
        <Route path='/register' element={<Auth insideRegister/>}></Route>
        <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
        <Route path='/admin-table' element={<Admintables/>}></Route>
        <Route path='/edit-placements/:id' elements = {<EditPlacements/>}></Route>
      </Routes>
    </>
  )
}

export default App
