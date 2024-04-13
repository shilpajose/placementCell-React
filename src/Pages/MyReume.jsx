import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import About from '../Components/About'
import Experience from '../Components/Experience'
import Education from '../Components/Education'
import Skills from '../Components/Skills'
import Interests from '../Components/Interests'
import Awards from '../Components/Awards'
import '../Components/Scripts'
import '../Components/Styles.css'
import Navigation from '../Components/Navigation'


function MyReume() {
    const navigate = useNavigate()
    // display user name after login
    // const [name,setDisplayName] = useState('')
    const data = sessionStorage.getItem('name')
    // console.log('name get',data);

    const logOut = () => {
        sessionStorage.removeItem('name')
        navigate('/')
    }
  return (
    <div id='resumepagebody'>
     {/* <!-- Responsive navbar--> */}
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div class="container px-5">
                    <a class="navbar-brand" href="#!">Welcome, <span className='text-danger'>{data} User</span></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <Link to={'/home'} style={{ textDecoration: 'none' }}>
                                <li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Home</a></li>
                            </Link>
                            <Link to={'/my-interviews'} style={{ textDecoration: 'none' }}>
                                <li class="nav-item"><a class="nav-link" href="#!">My-Interviews</a></li>
                            </Link>
                            <Link to={'/all-placements'} style={{ textDecoration: 'none' }}>
                                <li class="nav-item"><a class="nav-link" href="#!">All-Placements</a></li>
                            </Link>
                            <Link to={'/my-profile'} style={{ textDecoration: 'none' }}>
                                <li class="nav-item"><a class="nav-link" href="#!">Create-resume</a></li>
                            </Link>
                            <Link to={'/my-resume'} style={{ textDecoration: 'none' }}>
                                <li class="nav-item"><a class="nav-link" href="#!">My-Resume</a></li>
                            </Link>    
                            </ul>
                        <button onClick={logOut} className='btn btn-outline-danger pt-2 pb-2 ps-3 pe-3'>Logout</button>
                    </div>
                </div>
            </nav>
            <div className="container p-5" style={{marginLeft: '17rem'}}>
                <button className='btn btn-info'><i className='fas fa-download fa-1x'></i> Download Resume</button>
                <Navigation />
                <About />
                <hr className="m-0" />
                <Experience />
                <hr className="m-0" />
                <Education />
                <hr className="m-0" />
                <Skills />
                <hr className="m-0" />
                <Interests />
                <hr className="m-0" />
                <Awards />
            </div>
    </div>
  )
}

export default MyReume