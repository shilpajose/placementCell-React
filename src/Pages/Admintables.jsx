import React, { useEffect } from 'react'
import './admindashboardscripts.js'
import './admindashboardstyles.css'
import './admindatatable.js'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addPlacementsAPI, deletePlacementAPI, editPlacementAPI, getAllPlacementsAPI } from '../Services/AllApi.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FloatingLabel, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component'
import Badge from 'react-bootstrap/Badge';
// import EditPlacements from '../Components/EditPlacements.jsx'

function Admintables() {

    const navigate = useNavigate()
    const { id } = useParams()
    // add placement data
    const [inputs, setInputs] = useState({
        company_name: "", description: "", job_position: "", date: "", venue: ""
    })
    // console.log(inputs);

    // state for getting all placements
    const [allPlacementData, setAllPlacementData] = useState([])

    // state for edit response
    const [editResponse, setEditResponse] = useState('')

    // modal form
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setInputs({ company_name: "", description: "", job_position: "", date: "", venue: "" })
    }
    const handleShow = () => setShow(true);


    // edit
    const [editshow, setEditShow] = useState(false);
    const handleeditClose = () => setEditShow(false);
    // const handleeditShow = () => setEditShow(true);
    const handleeditShow = (rowData) => {
        setInputs({
            _id: rowData._id,
            company_name: rowData.company_name,
            description: rowData.description,
            job_position: rowData.job_position,
            date: rowData.date,
            venue: rowData.venue
        });
        setEditShow(true);
    };

    // logout
    const logout = () => {
        sessionStorage.removeItem('existingUser')
        navigate('/')
    }

    // validation fields logic
    const validateCompanyName = (company_name) => {
        return company_name.trim() !== ''
    }
    const validateCompanyAddress = (description) => {
        return description.trim() !== ''
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
        const { company_name, description, job_position, date, venue } = inputs
        if (validateCompanyName(company_name) && validateCompanyAddress(description) && validateJobPosition(job_position) && validateDate(date) && validateVenue(venue)) {
            try {
                // api call
                const result = await addPlacementsAPI(inputs)
                console.log(result);
                if (result.status == 200) {
                    toast.success('Placement for this company has been added')
                    setInputs({ company_name: "", description: "", job_position: "", date: "", venue: "" })
                    handleClose()
                    getAllPlacements()
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
            // console.log(result);
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

    //    data table
    const columns = [
        {
            name: 'Company Name',
            selector: row => row.company_name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Job Position',
            selector: row => row.job_position,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Venue',
            selector: row => row.venue,
            sortable: true,
        },
        {
            name: 'Edit',
            cell: (row) => (

                // <Link to={`/edit-placements/${row._id}`}><i class="fas fa-warning"></i></Link>

                <button className='btn text-primary' onClick={() => handleeditShow(row)}>
                    <i className='fa-solid fa-pen text-warning'></i>
                </button>
            ),
        },
        {
            name: 'Delete',
            cell: (row) => <button className='btn text-danger' onClick={() => handleDelete(row._id)}><i class="fa-solid fa-trash"></i></button>,
        },
    ];
    // filter
    const [filterValue, setFilterValue] = useState('');
    const [filteredData, setFilteredData] = useState(allPlacementData || []);

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    useEffect(() => {
        const newData = allPlacementData?.filter(row => {
            return row.company_name.toLowerCase().includes(filterValue.toLowerCase());
        }) || [];
        setFilteredData(newData);
    }, [filterValue, allPlacementData]);

    // delete placemet
    const handleDelete = async (id) => {
        const result = await deletePlacementAPI(id)
        if (result.status == 200) {
            getAllPlacements()
        }
        console.log(result);
    }
    const editPlacement = async () => {
        try {
            // Destructure values from inputs state
            const { _id, company_name, description, job_position, date, venue } = inputs;

            // Check if any required fields are empty
            if (!_id || !company_name || !description || !job_position || !date || !venue) {
                toast.warning("Please fill all the fields");
                return;
            }

            // Create a new FormData object and append data
            const reqBody = new FormData();
            reqBody.append("_id", _id);
            reqBody.append("company_name", company_name);
            reqBody.append("description", description);
            reqBody.append("job_position", job_position);
            reqBody.append("date", date);
            reqBody.append("venue", venue);

            // Make API call to update placement
            const result = await editPlacementAPI(_id, reqBody);

            // Handle API response
            if (result.status === 200) {
                setEditResponse(result);
                handleeditClose();
                getAllPlacements()
            } else {
                console.log(result.response);
            }
        } catch (err) {
            console.log(err);
        }
    };


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
                                
                                <Link to={'/admin-table'} style={{ textDecoration: 'none' }}>
                                    <a class="nav-link">
                                        <div class="sb-nav-link-icon"><i className="fas fa-user-tie"></i></div>
                                        Placements
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
                                    Managing all Placements data 
                                </div>
                            </div>
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    Placements Data
                                </div>
                                <h4 className='m-2'><Badge bg="warning">{allPlacementData?.length}</Badge> Entries</h4>
                                <div className='container mt-5 text-center d-flex justify-content-center'>
                                    <button onClick={handleShow} className='btn btn-success'>Add New <i className='fas fa-plus'></i></button>
                                    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                                        <div class="input-group">
                                            {/* onChange={handleFilter} */}
                                            <input onChange={handleFilterChange} className="form-control" type="text" placeholder="Search..." aria-label="Search" aria-describedby="btnNavbarSearch" />
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
                                            {/* <FloatingLabel
                                                controlId="floatingInputName"
                                                label="Description"
                                                className="mb-3"
                                            >
                                                <Form.Control value={inputs.description}
                                                    onChange={e => setInputs({ ...inputs, description: e.target.value })}
                                                    type="text"
                                                    placeholder="Description"
                                                    isInvalid={!validateCompanyAddress(inputs.description)}
                                                />
                                            </FloatingLabel> */}
                                            <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-3"
>
                                                <Form.Control value={inputs.description}
                                                    onChange={e => setInputs({ ...inputs, description: e.target.value })}
                                                    as="textarea"
                                                    placeholder="Leave a comment here"
                                                    style={{ height: '100px' }}
                                                    isInvalid={!validateCompanyAddress(inputs.description)}

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
                                                label="Time & Venue"
                                                className="mb-3"
                                            >
                                                <Form.Control value={inputs.venue}
                                                    onChange={e => setInputs({ ...inputs, venue: e.target.value })}
                                                    type="Venue"
                                                    placeholder="Time & Venue"
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
                    <Modal show={editshow} onHide={handleeditClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Placement data</Modal.Title>
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
                                    label="Description"
                                    className="mb-3"
                                >
                                    <Form.Control value={inputs.description}
                                        onChange={e => setInputs({ ...inputs, description: e.target.value })}
                                        type="text"
                                        placeholder="Description"
                                        isInvalid={!validateCompanyAddress(inputs.description)}
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
                            <Button variant="secondary" onClick={handleeditClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={editPlacement}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
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