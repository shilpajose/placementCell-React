import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userInterviewsAPI } from '../Services/AllApi'

function MyInterviews() {
    const navigate = useNavigate()
    // display user name after login
    // const [name,setDisplayName] = useState('')
    const data = sessionStorage.getItem('name')
    // console.log('name get',data);

    const [userInterviewData, setUserInterviewData] = useState([])

    const logOut = () => {
        sessionStorage.removeItem('name')
        navigate('/')
    }

    // get user interviews

    // const getUserinterviews = async () => {
    //     const userName = sessionStorage.getItem('name');
    //     console.log('1', userName);
    //     if (userName) {
    //         console.log('2', userName);
    //         try {
    //             // Pass userName to userInterviewsAPI function
    //             const result = await userInterviewsAPI({ userName });
    //             console.log('Result:', result); // Log the result received from the API

    //             if (result.status === 200) {
    //                 setUserInterviewData(result.data);
    //             }
    //         } catch (error) {
    //             if (error instanceof TypeError) {
    //                 console.error("TypeError occurred:", error.message);
    //             } else if (error instanceof ReferenceError) {
    //                 console.error("ReferenceError occurred:", error.message);
    //             } else {
    //                 console.error("An error occurred:", error.message);
    //             }
    //         }
    //     }
    // };

    // useEffect(() => {
    //     getUserinterviews(); // Call getUserinterviews on component mount
    // }, []);

    // const getUserinterviews = async () => {
    //     const userEmail = sessionStorage.getItem('email');
    //     console.log('1', userEmail);
    //     if (userEmail) {
    //         console.log('2', userEmail);
    //         try {
    //             const result = await userInterviewsAPI(userEmail); // Pass modified email directly
    //             console.log('Result:', result); // Log the result received from the API
    //             if (result.status === 200) {
    //                 setUserInterviewData(result.data);
    //             }
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    // };

    // useEffect(() => {
    //     const userEmail = sessionStorage.getItem('email');
    //     console.log('User Email:', userEmail); // Log the user email
    //     getUserinterviews(userEmail);
    // }, []);


    const getUserinterviews = async () => {
        const userEmail = sessionStorage.getItem('email');
    
        try {
            const result = await userInterviewsAPI(userEmail);
            if (result.status === 200) {
                setUserInterviewData(result.data);
            }
        } catch (err) {
            // Handle errors appropriately, e.g., display an error message to the user
            console.error(err);
        }
    };
    
    useEffect(() => {
        getUserinterviews();
    }, []); // Empty dependency array to run only on mount
    
console.log(userInterviewData);



    // const getUserinterviews = async ()=>{
    //     const userId = sessionStorage.getItem('uid');
    //     if(userId){
    //         try {
    //             // Pass userName to userInterviewsAPI function
    //             const result = await userInterviewsAPI(userId);
    //             console.log('Result:', result); // Log the result received from the API

    //             if (result.status === 200) {
    //                 setUserInterviewData(result.data);
    //             }
    //         } catch (error) {
    //             if (error instanceof TypeError) {
    //                 console.error("TypeError occurred:", error.message);
    //             } else if (error instanceof ReferenceError) {
    //                 console.error("ReferenceError occurred:", error.message);
    //             } else {
    //                 console.error("An error occurred:", error.message);
    //             }
    //         }
    //     }

    // }
    // useEffect(() => {
    //         getUserinterviews(); // Call getUserinterviews on component mount
    //     }, []);


    // console.log(userInterviewData);

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
                    {userInterviewData?.length > 0 && userInterviewData?.map((data, index) => (
                        <div key={index} className="col-md-4 mb-5">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex"></div>
                                    {/* <span className="avatar avatar-text rounded-3 me-4 mb-2 bg-warning">{avatarText}</span> */}
                                    <div className="row flex-fill">
                                        <div className="col-sm-5">
                                            <h4 className="h5">{data?.company}</h4>
                                            <span className="badge bg-secondary">at: {data?.date}</span>
                                        </div>
                                        <div><i className='fa-solid fa-trash text-danger'></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        // Add a condition to close the row after every third card
                    ))}
                </div>
            </div>

            {/* <!-- Footer--> */}
            <footer class="py-5 bg-dark" >
                <div class="container px-4 px-lg-5"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2024</p></div>
            </footer>
        </div>
    )
}

export default MyInterviews