import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Myprofile() {
    const navigate = useNavigate()
    // display user name after login
    // const [name,setDisplayName] = useState('')
    const data = sessionStorage.getItem('name')
    // console.log('name get',data);

    const logOut = () => {
        sessionStorage.removeItem('name')
        navigate('/')
    }
    const createResume =()=>{
        alert('Your resume created successfully.. do visit resume page')
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
                                <li class="nav-item"><a class="nav-link" href="#!">My Interviews</a></li>
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
            <div>
                <h3 className='text-center text-danger mt-5'>Create your portfolio</h3>
            </div>
            <div className='container w-50 p-5'>
                <div className='mb-2'>
                    <div className='mb-2'>
                        <input type="text" placeholder='Enter Full Name' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <input type="text" placeholder='Enter Department' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <input type="text" placeholder='Enter Experience' className='form-control' />
                    </div>
                </div>
                <div className='mb-2'>
                    <div className='mb-2'>
                        <input type="text" placeholder='Enter Education' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <input type="text" placeholder='Enter Skills' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <input type="text" placeholder='Enter Projects' className='form-control' />
                    </div>
                </div>
                <div>
                    <div className='mb-2'>
                        <input type="text" placeholder='Github link' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <input type="text" placeholder='LinkedIn link' className='form-control' />
                    </div>
                    <div className='text-center'>
                        <button onClick={createResume} className='btn btn-info text-light rounded-pill pt-3 pb-3 ps-5 pe-5'>Create</button>
                    </div>
                </div>
            </div>
            
            {/* <!-- Footer--> */}
            <footer class="py-5 bg-dark">
                <div class="container px-4 px-lg-5"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
            </footer>
        </div>
    )
}

export default Myprofile