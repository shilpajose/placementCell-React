import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Auth from './Pages/Auth'
import Homepage from './Pages/Homepage'
import MyInterviews from './Pages/MyInterviews'
import Allplacements from './Pages/Allplacements'
import Myprofile from './Pages/Myprofile'
import MyReume from './Pages/MyReume'
import AdminDashboard from './Pages/AdminDashboard'
import Admintables from './Pages/Admintables'
import UsersData from './Pages/UsersData'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/login' element={<Auth/>}></Route>
        <Route path='/register' element={<Auth insideRegister/>}></Route>
        <Route path='/home' element={<Homepage/>}></Route>
        <Route path='/my-interviews' element={<MyInterviews/>}></Route>
        <Route path='/all-placements' element={<Allplacements/>}></Route>
        <Route path='/my-profile' element={<Myprofile/>}></Route>
        <Route path='/my-resume' element={<MyReume/>}></Route>
        <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
        <Route path='/admin-table' element={<Admintables/>}></Route>
        <Route path='/admin-userdata' element={<UsersData/>}></Route>
      </Routes>
    </>
  )
}

export default App
