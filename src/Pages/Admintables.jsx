import React, { useEffect } from 'react'
import './admindashboardscripts.js'
import './admindashboardstyles.css'
import './admindatatable.js'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addPlacementsAPI, getAllPlacementsAPI } from '../Services/AllApi.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FloatingLabel, Form } from 'react-bootstrap'

function Admintables() {

    // add placement data
    const [inputs, setInputs] = useState({
        company_name: "", company_address: "", job_position: "", date: "", venue: ""
    })
    // console.log(inputs);

    // state for getting all placements
    const [allPlacementData, setAllPlacementData] = useState([])

    // modal form
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setInputs({ company_name: "", company_address: "", job_position: "", date: "", venue: "" })
    }
    const handleShow = () => setShow(true);

    // logout
    const logout = () => {
        sessionStorage.removeItem('existingUser')
        navigate('/')
    }

    // validation fields logic
    const validateCompanyName = (company_name) => {
        return company_name.trim() !== ''
    }
    const validateCompanyAddress = (company_address) => {
        return company_address.trim() !== ''
    }
    const validateJobPosition = (job_position) => {
        return job_position.trim() !== ''
    }
    const validateDate = (date) => {
        return date.trim() !== ''
    }
    const validateVenue = (venue) => {
        return venue.trim() !== ''
    }

    // add placements
    const AddPlacements = async (e) => {
        e.preventDefault()
        const { company_name, company_address, job_position, date, venue } = inputs
        if (validateCompanyName(company_name) && validateCompanyAddress(company_address) && validateJobPosition(job_position) && validateDate(date) && validateVenue(venue)) {
            try {
                // api call
                const result = await addPlacementsAPI(inputs)
                console.log(result);
                if (result.status == 200) {
                    toast.success('Placement for this company has been added')
                    setInputs({ company_name: "", company_address: "", job_position: "", date: "", venue: "" })
                } else {
                    toast.error(result.response.data)
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            toast.warning('Fill the form')
        }
    }

    // get all placements
    const getAllPlacements = async () => {
        try {
            const result = await getAllPlacementsAPI()
            console.log(result);
            if (result.status == 200) {
                setAllPlacementData(result.data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllPlacements()
    }, [])
    return (
        <>
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                {/* <!-- Navbar Brand--> */}
                <Link to={'/admindashboard'} style={{ textDecoration: 'none' }}>
                    <a class="navbar-brand ps-3">Placement Cell</a>
                </Link>
                {/* <!-- Sidebar Toggle--> */}
                <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
                {/* <!-- Navbar Search--> */}
                <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div class="input-group">
                        <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </form>
                {/* <!-- Navbar--> */}
                <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#!">Settings</a></li>
                            <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item"><button className='btn' onClick={logout}>Logout</button></a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div class="sb-sidenav-menu">
                            <div class="nav">
                                <div class="sb-sidenav-menu-heading">Core</div>
                                <Link to={'/admindashboard'} style={{ textDecoration: 'none' }}>
                                    <a class="nav-link">
                                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                        Dashboard
                                    </a>
                                </Link>
                                <div class="sb-sidenav-menu-heading">Addons</div>
                                <Link to={'/admin-userdata'} style={{ textDecoration: 'none' }}>
                                    <a class="nav-link">
                                        <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
                                        User Management
                                    </a>
                                </Link>
                                <Link to={'/admin-table'} style={{ textDecoration: 'none' }}>
                                    <a class="nav-link">
                                        <div class="sb-nav-link-icon"><i className="fas fa-user-tie"></i></div>
                                        Placements
                                    </a>
                                </Link>
                                <Link to={'/admin-jobapplications'} style={{ textDecoration: 'none' }}>
                                    <a class="nav-link">
                                        <div class="sb-nav-link-icon"><i className="fas fa-user-tie"></i></div>
                                        Job Applications
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div class="sb-sidenav-footer">
                            <div class="small">Logged in as:</div>
                            Placement Cell
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <h1 class="mt-4">Placements</h1>
                            <ol class="breadcrumb mb-4">
                                <Link to={'/admindashboard'} style={{ textDecoration: 'none' }}>
                                    <li class="breadcrumb-item"><a >Dashboard /</a></li>
                                </Link>
                                <li class="breadcrumb-item active">Placement Management</li>
                            </ol>
                            <div class="card mb-4">
                                <div class="card-body">
                                    Managing all Placements data , adding,updating and deleting
                                </div>
                            </div>
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    Placements Data                            </div>
                                10 entries
                                <div className='container mt-5 text-center d-flex justify-content-center'>
                                    <button onClick={handleShow} className='btn btn-success'>Add New <i className='fas fa-plus'></i></button>
                                    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                                        <div class="input-group">
                                            <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                                            <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
                                        </div>
                                    </form>
                                </div>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Placement data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <Form>
                                            <FloatingLabel
                                                controlId="floatingInputName"
                                                label="Company_name"
                                                className="mb-3"
                                            >
                                                <Form.Control value={inputs.company_name}
                                                    onChange={e => setInputs({ ...inputs, company_name: e.target.value })}
                                                    type="text"
                                                    placeholder="Company_name"
                                                    isInvalid={!validateCompanyName(inputs.company_name)}
                                                />
                                            </FloatingLabel>
                                            <FloatingLabel
                                                controlId="floatingInputName"
                                                label="Company_Address"
                                                className="mb-3"
                                            >
                                                <Form.Control value={inputs.company_address}
                                                    onChange={e => setInputs({ ...inputs, company_address: e.target.value })}
                                                    type="text"
                                                    placeholder="Company_Address"
                                                    isInvalid={!validateCompanyAddress(inputs.company_address)}
                                                />
                                            </FloatingLabel>
                                            <FloatingLabel
                                                controlId="floatingInputName"
                                                label="Job Position"
                                                className="mb-3"
                                            >
                                                <Form.Control value={inputs.job_position}
                                                    onChange={e => setInputs({ ...inputs, job_position: e.target.value })}
                                                    type="text"
                                                    placeholder="Job Position"
                                                    isInvalid={!validateJobPosition(inputs.job_position)}
                                                />
                                            </FloatingLabel>
                                            <FloatingLabel
                                                controlId="floatingInputName"
                                                label="Date"
                                                className="mb-3"
                                            >
                                                <Form.Control value={inputs.date}
                                                    onChange={e => setInputs({ ...inputs, date: e.target.value })}
                                                    type="date"
                                                    placeholder="Date"
                                                    isInvalid={!validateDate(inputs.date)}
                                                />
                                            </FloatingLabel>
                                            <FloatingLabel
                                                controlId="floatingInputName"
                                                label="Venue"
                                                className="mb-3"
                                            >
                                                <Form.Control value={inputs.venue}
                                                    onChange={e => setInputs({ ...inputs, venue: e.target.value })}
                                                    type="Venue"
                                                    placeholder="Date"
                                                    isInvalid={!validateVenue(inputs.venue)}
                                                />
                                            </FloatingLabel>
                                        </Form>



                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={AddPlacements}>
                                            Save
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <div class="card-body">
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Company Name</th>
                                                <th>Company Address</th>
                                                <th>Job Position</th>
                                                <th>Date</th>
                                                <th>Venue</th>
                                                <th>Actions</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allPlacementData?.length>0 && allPlacementData?.map(placements=>(
                                                    <tr key={placements}>
                                                    <td>{placements.company_name}</td>
                                                    <td>{placements.company_address}</td>
                                                    <td>{placements.job_position}</td>
                                                    <td>{placements.date}</td>
                                                    <td>{placements.venue}</td>
                                                    <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                    <td><i className='fa-solid fa-trash text-danger'></i></td>
                                                </tr>
                                                ))
                                            }
                                        </tbody>
                                        <h5 className='text-center'>Pagination 1 2 3 4 5 6 </h5>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer class="py-4 bg-light mt-auto">
                        <div class="container-fluid px-4">
                            <div class="d-flex align-items-center justify-content-between small">
                                <div class="text-muted">Copyright &copy; Your Website 2023</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                <ToastContainer position='top-center' theme='colored' autoClose={3000} />
            </div>
        </>
    )
}

export default Admintables