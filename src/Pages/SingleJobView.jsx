import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { jobApplicationAPI, singleJobDetailAPI } from '../Services/AllApi'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function SingleJobView() {

    const navigate = useNavigate()
    // set file status
    const [fileStatus, setFileStatus] = useState(false)

    const [inputs, setInputs] = useState({
        fullname: "", phone: "", department: "", resume: ""
    })

    const name = sessionStorage.getItem('name')

    const { id } = useParams()

    const [singleData, setSingleData] = useState('')

    const logOut = () => {
        sessionStorage.removeItem('name')
        navigate('/')
    }

    // single job details
    const singleJobdetails = async (_id) => {
        try {
            const result = await singleJobDetailAPI(_id)
            console.log(result);
            if (result.status == 200) {
                setSingleData(result.data)
                sessionStorage.setItem("date", JSON.stringify(result.data.date))
                sessionStorage.setItem("JobId", JSON.stringify(result.data._id))
                sessionStorage.setItem("company", JSON.stringify(result.data.company_name))
                setInputs({ fullname: "", email: "", jobId: "", phone: "", department: "", resume: "" })
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (id) {
            singleJobdetails(id);
        }
    }, [id])
    // console.log(singleData);
    console.log(inputs);

    // validation
    const validateFullname = (fullname) => {
        return fullname.trim() !== ""
    }

    const validatePhone = (phone) => {
        return !(phone.length > 10);
    }
    const validateDept = (department) => {
        return department.trim() !== ""
    }

    const pid = sessionStorage.getItem('JobId')
    const userEmail = sessionStorage.getItem('email')
    const company = sessionStorage.getItem('company')
    const date = sessionStorage.getItem('date')
    const userId = sessionStorage.getItem('uid')

    console.log('Job Id :', pid);
    console.log('company :', company);
    console.log('User Email :', userEmail);
    console.log('User Name :', name);
    console.log('Date:', date);
    console.log('userId:', userId);

    // job apply form
    // const jobApply = async (e) => {
    //     e.preventDefault()
    //     const { fullname, email, jobId, phone, department, resume } = inputs
    //     const pid = sessionStorage.getItem('single-placement');

    //     if (validateFullname(fullname) && validateEmail(email) && validateJobId(jobId) && validatePhone(phone) && validateDept(department) && resume) {

    //          const reqHeader = {
    //             "Content-Type" :"multipart/form-data",
    //          }

    //         try {
    //             // Create a new FormData object and append data
    //             const reqBody = new FormData();
    //             reqBody.append("fullname", fullname);
    //             reqBody.append("email", email);
    //             reqBody.append("jobId", jobId);
    //             reqBody.append("phone", phone);
    //             reqBody.append("department", department);
    //             reqBody.append("resume", resume);
    //             reqBody.append("pid", pid);
    //             // api call
    //             const result = await jobApplicationAPI(reqBody,reqHeader)
    //             if (result.status == 200) {
    //                 toast.success('Job Applied Successfully')
    //                 setSingleData({...singleData, inputs})
    //                 setInputs({ fullname: "", email: "", jobId: "", phone: "", department: "", resume: "" })
    //             }
    //             else {
    //                 toast.error(result.response.data)
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         }

    //     } else {
    //         toast.warning('fill the form')
    //     }
    // }

    const jobApply = async (e) => {
        e.preventDefault();
        const { fullname, phone, department, resume } = inputs;
        console.log('form-dataaaa', inputs);
        // Retrieve data from sessionStorage
        const jobId = sessionStorage.getItem('JobId');
        const company = sessionStorage.getItem('company');
        const date = sessionStorage.getItem('date');
        const userEmail = sessionStorage.getItem('email')
        const userId = sessionStorage.getItem('uid')

// 
        if (validateFullname(fullname) && validatePhone(phone) && validateDept(department) && resume && jobId && company && date && userEmail && userId) {
            // Create a new FormData object and append data from both sessionStorage and form inputs
            const reqBody = new FormData();
            reqBody.append("fullname", fullname);
            const modifiedJobId = jobId.replace(/^"(.*)"$/, '$1')
            reqBody.append("jobId", modifiedJobId);
            reqBody.append("phone", phone);
            reqBody.append("department", department);
            reqBody.append("resume", resume);
            const modifiedUserCompany = company.replace(/^"(.*)"$/, '$1'); // Remove surrounding double quotes
            reqBody.append("company", modifiedUserCompany);
            const modifiedUserDate = date.replace(/^"(.*)"$/, '$1'); // Remove surrounding double quotes
            reqBody.append("date", modifiedUserDate);
            const modifiedUserEmail = userEmail.replace(/^"(.*)"$/, '$1'); // Remove surrounding double quotes
            reqBody.append("userEmail", modifiedUserEmail);
            const modifiedUserId = userId.replace(/^"(.*)"$/, '$1'); // Remove surrounding double quotes
            reqBody.append("userId", modifiedUserId);

            console.log('reqqqq',reqBody);
            const reqHeader = {
                "Content-Type": "multipart/form-data",
            };
            console.log('bodyyyy',reqBody);

            try {
                // api call
                const result = await jobApplicationAPI(reqBody, reqHeader);
                if (result.status === 200) {
                    console.log(result.data);
                    toast.success('Job Applied Successfully');
                    setSingleData({ ...singleData, inputs });
                    setInputs({ fullname: "", phone: "", department: "", resume: "" });
                    setTimeout(() => {
                        navigate('/all-placements')
                    }, 3000)
                } else {
                    toast.error(result.response.data);
                }
            } catch (err) {
                console.log(err);
            }

        } else {
            toast.warning('Fill the form');
        }
    }


    useEffect(() => {
        if (inputs.resume) {
            setFileStatus(true)
        } else {
            setFileStatus(false)
            setInputs({ ...inputs, resume: "" })
        }
    }, [inputs.resume])

    return (
        <div id='homepagebody'>
            <div>
                {/* <!-- Responsive navbar--> */}
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container px-5">
                        <a class="navbar-brand" href="#!">Welcome, <span className='text-danger'>{name} </span></a>
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
                <div className='row container w-100 mb-5'>
                    {singleData ? (
                        <div className='col ms-5 text-light'>
                            <Link to="/all-placements" className='btn btn-success mt-5 mb-5'>Go Back</Link>

                            <h2>{singleData?.job_position}</h2>
                            <p>Description: <span className='text-info'>{singleData.description}</span></p>
                            <p>Company Name: <span className='text-info'>{singleData?.company_name}</span></p>
                            <p>Interview Date: <span className='text-info'>{singleData?.date}</span></p>
                            <p>Venue & Time for the Interview: <span className='text-info'>{singleData?.venue}</span></p>
                            {/* Add more job details here */}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}

                    <div className='col container border p-5 mt-5 mb-5'>
                        <Form>
                            <h3 className='text-primary'>Apply For this Job</h3>
                            <Form.Group className="mb-3" controlId="formBasicInput">
                                <Form.Label className='text-light'>Full Name</Form.Label>
                                <Form.Control value={inputs.fullname} onChange={e => setInputs({ ...inputs, fullname: e.target.value })} isInvalid={!validateFullname(inputs.fullname)} type="text" placeholder="Full Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicInput">
                                <Form.Label className='text-light'>Phone Number</Form.Label>
                                <Form.Control value={inputs.phone} onChange={e => setInputs({ ...inputs, phone: e.target.value })} isInvalid={!validatePhone(inputs.phone)} type="text" placeholder="Phone Number" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicInput">
                                <Form.Label className='text-light'>Department</Form.Label>
                                <Form.Control value={inputs.department} onChange={e => setInputs({ ...inputs, department: e.target.value })} isInvalid={!validateDept(inputs.department)} type="text" placeholder="Department" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicInput">
                                <Form.Label className='text-light'>Upload Resume</Form.Label>
                                <Form.Control onChange={e => setInputs({ ...inputs, resume: e.target.files[0] })} type="file" placeholder="Upload Resume" />
                            </Form.Group>
                            {!fileStatus && <div className='text-danger my-2'>* Supported only pdf file !!!</div>}
                            <div className='d-flex justify-content-center'>
                                <Button variant="light" className='me-2 mb-5 text-success' type="submit">
                                    Cancel
                                </Button>
                                <Button onClick={jobApply} variant="info" className='mb-5' type="submit">
                                    Apply
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>

            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </div>
    )
}

export default SingleJobView
