
import React, { useEffect, useState } from 'react'
import './admindashboardscripts.js'
import './admindashboardstyles.css'
import './admindatatable.js'
import { Link } from 'react-router-dom'
import { deleteJobApplicationsAPI, getAllJobApplicationsAPI } from '../Services/AllApi.js'
import DataTable from 'react-data-table-component'
import { Row } from 'react-bootstrap'


function JobApplications() {
    const logout = () => {
        sessionStorage.removeItem('existingUser')
        navigate('/')
    }

    // all applications
    const [allData, setAllData] = useState([])

    const getAllData = async () => {
        try {
            const result = await getAllJobApplicationsAPI()
            if (result.status == 200) {
                // console.log(result.data);
                setAllData(result.data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getAllData()
    }, [])
    console.log(allData);
    //    data table
    const columns = [
        {
            name: 'student Name',
            selector: row => row.fullname,
            sortable: true,
        },
        {
            name: 'EmailId',
            selector: row => row.userEmail,
            sortable: true,
        },
        
        {
            name: 'Company Name',
            selector: row => row.company,
            sortable: true,
        },
        
        {
            name: 'Interview Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Delete',
            cell: (row) => <button className='btn text-danger' onClick={() => handleDelete(row._id)}><i class="fa-solid fa-trash"></i></button>,
        },
    ];
    // filter
    const [filterValue, setFilterValue] = useState('');
    const [filteredData, setFilteredData] = useState(allData || []);

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    useEffect(() => {
        const newData = allData?.filter(row => {
            return row.fullname?.toLowerCase().includes(filterValue.toLowerCase());
        }) || [];
        setFilteredData(newData);
    }, [filterValue, allData]);

    // delete job applications
    const handleDelete = async (id) => {
        const result = await deleteJobApplicationsAPI(id)
        if (result.status == 200) {
            getAllData()
        }
        console.log(result);
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
                            <h1 class="mt-4">Job Application Management</h1>
                            <ol class="breadcrumb mb-4">
                                <Link to={'/admindashboard'} style={{ textDecoration: 'none' }}>
                                    <li class="breadcrumb-item"><a>Dashboard /</a></li>
                                </Link>
                                <li class="breadcrumb-item active">Job Application Management</li>
                            </ol>
                            <div class="card mb-4">
                                <div class="card-body">
                                    Managing all Job Application data 
                                </div>
                            </div>
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    Job Application Data                            </div>
                                <div className='container mt-5 text-center d-flex justify-content-center'>
                                    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                                        <div class="input-group">
                                            {/* onChange={handleFilter} */}
                                            <input onChange={handleFilterChange} className="form-control" type="text" placeholder="Search..." aria-label="Search" aria-describedby="btnNavbarSearch" />
                                            <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-body">
                                    <DataTable
                                        columns={columns}
                                        data={filteredData}
                                        selectableRows
                                        fixedHeader
                                        pagination
                                    />
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

export default JobApplications