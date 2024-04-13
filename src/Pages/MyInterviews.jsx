import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function MyInterviews() {
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
        <div id='homepagebody'>
            {/* <!-- Responsive navbar--> */}
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
                            </Link>                      </ul>
                        <button onClick={logOut} className='btn btn-outline-danger pt-2 pb-2 ps-3 pe-3'>Logout</button>
                    </div>
                </div>
            </nav>
            <div className='container p-5'>
                {/* <!-- Call to Action--> */}
                <div class="card-body"><h3 class="text-white text-center m-5 m-0">My Interviews</h3></div>
                {/* <!-- Content Row--> */}
                <div class="row gx-4 gx-lg-5">
                    <div class="col-md-4 mb-5">
                        <div class="card h-100 bg-info">
                            <div class="card-body">
                                <h3 class="card-title text-light">Freshers Drive</h3>
                                <p class="card-text text-light">Company Name</p>
                                <p class="card-text text-light">Venue</p>
                                <p class="card-text text-light">Date</p>
                            </div>
                                <div class="card-footer"><a class="btn btn-danger" href="#!">Delete</a></div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <div class="card h-100 bg-info">
                            <div class="card-body">
                                <h3 class="card-title text-light">Walkin Drive</h3>
                                <p class="card-text text-light">Company Name</p>
                                <p class="card-text text-light">Venue</p>
                                <p class="card-text text-light">Date</p>
                            </div>
                                <div class="card-footer"><a class="btn btn-danger" href="#!">Delete</a></div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <div class="card h-100 bg-info">
                            <div class="card-body">
                                <h3 class="card-title text-light">Freshers Drive</h3>
                                <p class="card-text text-light">Company Name</p>
                                <p class="card-text text-light">Venue</p>
                                <p class="card-text text-light">Date</p>
                            </div>
                                <div class="card-footer"><a class="btn btn-danger" href="#!">Delete</a></div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <div class="card h-100 bg-info">
                            <div class="card-body">
                                <h3 class="card-title text-light">Freshers Drive</h3>
                                <p class="card-text text-light">Company Name</p>
                                <p class="card-text text-light">Venue</p>
                                <p class="card-text text-light">Date</p>
                            </div>
                                <div class="card-footer"><a class="btn btn-danger" href="#!">Delete</a></div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <div class="card h-100 bg-info">
                            <div class="card-body">
                                <h3 class="card-title text-light">Freshers Drive</h3>
                                <p class="card-text text-light">Company Name</p>
                                <p class="card-text text-light">Venue</p>
                                <p class="card-text text-light">Date</p>
                            </div>
                                <div class="card-footer"><a class="btn btn-danger" href="#!">Delete</a></div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <div class="card h-100 bg-info">
                            <div class="card-body">
                                <h3 class="card-title text-light">Freshers Drive</h3>
                                <p class="card-text text-light">Company Name</p>
                                <p class="card-text text-light">Venue</p>
                                <p class="card-text text-light">Date</p>
                            </div>
                                <div class="card-footer"><a class="btn btn-danger" href="#!">Delete</a></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Footer--> */}
            <footer class="py-5 bg-dark" >
                <div class="container px-4 px-lg-5"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
            </footer>
        </div>
    )
}

export default MyInterviews