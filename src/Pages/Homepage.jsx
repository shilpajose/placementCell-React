import React from 'react'
import './homepageStyles.css'
import { Link, useNavigate } from 'react-router-dom'
import ContactUs from '../Components/ContactUs'

function Homepage() {
    const navigate = useNavigate()
    // display user name after login
    // const [name,setDisplayName] = useState('')
    const data = sessionStorage.getItem('name')
    const emailid = sessionStorage.getItem('email')

    const logOut = () => {
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('existingUser')
        sessionStorage.removeItem('Placement')
        sessionStorage.removeItem('single-placement')
        sessionStorage.removeItem('Placements')
        navigate('/')
    }

    // user interviews
    
    return (
        <div id="homepagebody">
            {/* <!-- Responsive navbar--> */}
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container px-5">
                    <a class="navbar-brand" href="#!">Welcome, <span className='text-danger'>{data}</span></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <Link to={'/home'} style={{ textDecoration: 'none' }}>
                                <li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Home</a></li>
                            </Link>
                            {/* <Link to={'/my-interviews'} style={{ textDecoration: 'none' }}>
                                <li class="nav-item"><a class="nav-link" href="#!">My Interviews</a></li>
                            </Link> */}
                            <Link to={'/all-placements'} style={{ textDecoration: 'none' }}>
                                <li class="nav-item"><a class="nav-link" href="#!">All-Placements</a></li>
                            </Link>
                            {/* <Link to={'/my-profile'} style={{ textDecoration: 'none' }}>
                                <li class="nav-item"><a class="nav-link" href="#!">Create-resume</a></li>
                            </Link>
                            <Link to={'/my-resume'} style={{ textDecoration: 'none' }}>
                                <li class="nav-item"><a class="nav-link" href="#!">My-Resume</a></li>
                            </Link> */}
                        </ul>
                        <button onClick={logOut} className='btn btn-outline-danger pt-2 pb-2 ps-3 pe-3'>Logout</button>
                    </div>
                </div>
            </nav>
            {/* <!-- Page Content--> */}
            <div class="container px-4 px-lg-5">
                {/* <!-- Heading Row--> */}
                <div class="row gx-4 gx-lg-5 align-items-center my-5">
                    <div class="col-lg-7"><img class="img-fluid rounded mb-4 mb-lg-0" src="https://i.postimg.cc/cLD2GLv7/user22-removebg-preview.png" alt="..." style={{ height: '300px' }} /></div>
                    <div class="col-lg-5">
                        <h3 class="font-weight-light text-light">{data}</h3>
                        <p><span className='text-light'>Email Id:</span> <span className='text-danger'>{emailid}</span></p>
                    </div>
                </div>
                <hr style={{ border: 'none', height: '2px', backgroundColor: 'orange' }} />
                {/* <!-- Call to Action--> */}
                {/* <!-- Content Row--> */}
               
            </div>
<ContactUs/>

            {/* <!-- Footer--> */}
            <footer class="py-5 bg-dark" >
                <div class="container px-4 px-lg-5"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2024</p></div>
            </footer>
        </div>
    )
}

export default Homepage