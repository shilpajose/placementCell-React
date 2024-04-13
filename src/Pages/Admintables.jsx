import React from 'react'
import './admindashboardscripts.js'
import './admindashboardstyles.css'
import './admindatatable.js'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UsersData() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                {/* <!-- Navbar Brand--> */}
                <a class="navbar-brand ps-3" href="index.html">Placement Cell</a>
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
                            <li><a class="dropdown-item" href="#!">Logout</a></li>
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
                                <a class="nav-link">
                                    <div class="sb-nav-link-icon"><i className="fas fa-sign-out-alt"></i></div>
                                    LogOut
                                </a>
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
                                <li class="breadcrumb-item active">User Management</li>
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
                                        <input type="text" placeholder='Company Name' className='form-control mb-2'/>
                                        <input type="text" placeholder='Company address' className='form-control  mb-2'/>
                                        <input type="text" placeholder='Job position' className='form-control  mb-2'/>
                                        <input type="text" placeholder='Interview Date' className='form-control  mb-2'/>
                                        <input type="text" placeholder='Venue' className='form-control  mb-2'/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <div class="card-body">
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                                <th>Actions</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Tiger Nixon</td>
                                                <td>System Architect</td>
                                                <td>Edinburgh</td>
                                                <td>61</td>
                                                <td>2011/04/25</td>
                                                <td>$320,800</td>
                                                <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                <td><i className='fa-solid fa-trash text-danger'></i></td>
                                            </tr>
                                            <tr>
                                                <td>Garrett Winters</td>
                                                <td>Accountant</td>
                                                <td>Tokyo</td>
                                                <td>63</td>
                                                <td>2011/07/25</td>
                                                <td>$170,750</td>
                                                <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                <td><i className='fa-solid fa-trash text-danger'></i></td>
                                            </tr>
                                            <tr>
                                                <td>Ashton Cox</td>
                                                <td>Junior Technical Author</td>
                                                <td>San Francisco</td>
                                                <td>66</td>
                                                <td>2009/01/12</td>
                                                <td>$86,000</td>
                                                <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                <td><i className='fa-solid fa-trash text-danger'></i></td>
                                            </tr>
                                            <tr>
                                                <td>Cedric Kelly</td>
                                                <td>Senior Javascript Developer</td>
                                                <td>Edinburgh</td>
                                                <td>22</td>
                                                <td>2012/03/29</td>
                                                <td>$433,060</td>
                                                <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                <td><i className='fa-solid fa-trash text-danger'></i></td>
                                            </tr>
                                            <tr>
                                                <td>Airi Satou</td>
                                                <td>Accountant</td>
                                                <td>Tokyo</td>
                                                <td>33</td>
                                                <td>2008/11/28</td>
                                                <td>$162,700</td>
                                                <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                <td><i className='fa-solid fa-trash text-danger'></i></td>
                                            </tr>
                                            <tr>
                                                <td>Brielle Williamson</td>
                                                <td>Integration Specialist</td>
                                                <td>New York</td>
                                                <td>61</td>
                                                <td>2012/12/02</td>
                                                <td>$372,000</td>
                                                <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                <td><i className='fa-solid fa-trash text-danger'></i></td>
                                            </tr>
                                            <tr>
                                                <td>Herrod Chandler</td>
                                                <td>Sales Assistant</td>
                                                <td>San Francisco</td>
                                                <td>59</td>
                                                <td>2012/08/06</td>
                                                <td>$137,500</td>
                                                <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                <td><i className='fa-solid fa-trash text-danger'></i></td>
                                            </tr>
                                            <tr>
                                                <td>Rhona Davidson</td>
                                                <td>Integration Specialist</td>
                                                <td>Tokyo</td>
                                                <td>55</td>
                                                <td>2010/10/14</td>
                                                <td>$327,900</td>
                                                <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                <td><i className='fa-solid fa-trash text-danger'></i></td>
                                            </tr>
                                            <tr>
                                                <td>Colleen Hurst</td>
                                                <td>Javascript Developer</td>
                                                <td>San Francisco</td>
                                                <td>39</td>
                                                <td>2009/09/15</td>
                                                <td>$205,500</td>
                                                <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                <td><i className='fa-solid fa-trash text-danger'></i></td>
                                            </tr>
                                            <tr>
                                                <td>Sonya Frost</td>
                                                <td>Software Engineer</td>
                                                <td>Edinburgh</td>
                                                <td>23</td>
                                                <td>2008/12/13</td>
                                                <td>$103,600</td>
                                                <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                <td><i className='fa-solid fa-trash text-danger'></i></td>
                                            </tr>
                                            <tr>
                                                <td>Jena Gaines</td>
                                                <td>Office Manager</td>
                                                <td>London</td>
                                                <td>30</td>
                                                <td>2008/12/19</td>
                                                <td>$90,560</td>
                                                <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                <td><i className='fa-solid fa-trash text-danger'></i></td>
                                            </tr>
                                            <tr>
                                                <td>Quinn Flynn</td>
                                                <td>Support Lead</td>
                                                <td>Edinburgh</td>
                                                <td>22</td>
                                                <td>2013/03/03</td>
                                                <td>$342,000</td>
                                                <td><i className='fa-solid fa-pen text-warning'></i></td>
                                                <td><i className='fa-solid fa-trash text-danger'></i></td>
                                            </tr>

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
            </div>
        </>
    )
}

export default UsersData