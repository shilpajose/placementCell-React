import React, { useEffect, useState } from 'react'
import './admindashboardscripts.js'
import './admindashboardstyles.css'
import './admindatatable.js'
import './datatables-demo.js'
import { Link, useNavigate } from 'react-router-dom'
import { getAllPlacementsAPI } from '../Services/AllApi.js'
import { Table } from 'react-bootstrap'

function AdminDashboard() {
    const [allPlacementData, setAllPlacementData] = useState([])

    const getAllData = async () => {
        try {
            const result = await getAllPlacementsAPI()
            if (result.status == 200) {
                setAllPlacementData(result.data)
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllData()
    }, [])

    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem('existingUser')
        navigate('/')
    }
    const user = sessionStorage.getItem('existingUser')


    console.log(allPlacementData);

    const placement = () => {
        navigate('/admin-table')
    }

    return (
        <>
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                {/* <!-- Navbar Brand--> */}
                <Link to={'/admindashboard'} style={{ textDecoration: 'none' }}>
                    <a class="navbar-brand ps-3">Placement Cell</a>
                </Link>

                {/* <!-- Sidebar Toggle--> */}
                <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
                <p className='text-light ms-5'>Welcome<span className='text-warning'>{user}</span></p>
                {/* <!-- Navbar Search--> */}
                <div className='ms-5 d-flex' style={{position:'absolute',right:'450px'}}>
                    <i className="fa-solid fa-users text-warning ms-5"></i><sup className='text-light'>10</sup>
                    <i class="fa-regular fa-address-card text-warning ms-1"></i><sup className='text-light'>15</sup>
                    <i class="fa-solid fa-laptop text-warning ms-1"></i><sup className='text-light'>20 </sup>
                </div>
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
                            <h1 class="mt-4">Dashboard</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Dashboard</li>
                            </ol>
                            <div class="row">
                                <div class="col-xl-3 col-md-6">
                                    <div class="card bg-primary text-white mb-4">
                                        <div class="card-body">Placements Data</div>
                                        <div class="card-footer d-flex align-items-center justify-content-between">
                                            <a class="small text-white stretched-link" href="#">View Details</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="card bg-warning text-white mb-4">
                                        <div class="card-body">Users Data</div>
                                        <div class="card-footer d-flex align-items-center justify-content-between">
                                            <a class="small text-white stretched-link" href="#">View Details</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="card bg-success text-white mb-4">
                                        <div class="card-body">Job Applications</div>
                                        <div class="card-footer d-flex align-items-center justify-content-between">
                                            <a class="small text-white stretched-link" href="#">View Details</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="card bg-danger text-white mb-4">
                                        <div class="card-body">All Data</div>
                                        <div class="card-footer d-flex align-items-center justify-content-between">
                                            <a class="small text-white stretched-link" href="#">View Details</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <i class="fas fa-chart-area me-1"></i>
                                            Area Chart Example
                                        </div>
                                        <div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas>
                                            <img src="https://www.datapine.com/blog/wp-content/uploads/2023/04/area-chart-cash-burn-rate.png" alt="" style={{ height: '250px' }} />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <i class="fas fa-chart-bar me-1"></i>
                                            Bar Chart Example
                                        </div>
                                        <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas>
                                            <img src="https://cdn.sanity.io/images/599r6htc/localized/5ad851c14fe712b1789e645bf5f187c1ea9679f2-1108x1108.png?w=1200&q=70&fit=max&auto=format" alt="" style={{ height: '250px' }} /></div>
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    All Placements
                                </div>
                                <p>{allPlacementData?.length}</p>
                                <div class="card-body">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Job Name</th>
                                                <th>Company Name</th>
                                                <th>Interview Date</th>
                                                <th>Interview Venue</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allPlacementData?.length > 0 && allPlacementData?.map((data, index) => (
                                                    <tr key={data}>
                                                        <td>{index + 1}</td>
                                                        <td>{data.job_position}</td>
                                                        <td>{data.company_name}</td>
                                                        <td>{data.date}</td>
                                                        <td>{data.venue}</td>
                                                        <td onClick={placement}><i className='fas fa-eye text-success'></i></td>
                                                    </tr>

                                                ))
                                            }
                                        </tbody>
                                    </Table>
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

export default AdminDashboard