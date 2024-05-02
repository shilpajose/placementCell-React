import React, {useState } from 'react'
import JobCard from './JobCard'
import './jobcardstyle.css'
import { Link, useNavigate } from 'react-router-dom'

function Allplacements() {
  const [searchKey, setSearchKey] = useState("");
    const navigate = useNavigate()
    // display user name after login
    const data = sessionStorage.getItem('name')

    const logOut = () => {
        sessionStorage.removeItem('name')
        navigate('/')
    }
    
    return (
        <div id='homepagebody'>
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
                                <li class="nav-item"><a class="nav-link" href="#!">My-Interviews</a></li>
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
            <div className="container">
                <div className="text-center mb-5">
                    <h3 className='mt-5'>Job openings</h3>
                    <input onChange={e => setSearchKey(e.target.value)}
                        type="text"
                        placeholder='Search for matching jobs'
                        className='form-control container w-50 mt-5' />
                </div>

                <JobCard searchKey={searchKey}/>

            </div>
            {/* <!-- Footer--> */}
            <footer class="py-5 bg-dark" >
                <div class="container px-4 px-lg-5"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2024</p></div>
            </footer>
        </div>
    )
}

export default Allplacements