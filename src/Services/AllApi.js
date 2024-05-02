import { CommonAPI } from "./CommonAPI";
import { SERVER_URL } from "./SERVER_URL";

// Admin Login
export const adminLoginAPI = async (reqBody) => {
    return await CommonAPI('POST', `${SERVER_URL}/admin-login`, reqBody);
}

// admin add placements 
export const addPlacementsAPI = async (reqBody) => {
    return await CommonAPI("POST", `${SERVER_URL}/admin/add-placements`, reqBody)
}

// get all placements
export const getAllPlacementsAPI = async () => {
    return await CommonAPI("GET", `${SERVER_URL}/admin/allplacements`)
}

// search all placements
export const searchAllPlacementsAPI = async (searchKey) => {
    return await CommonAPI("GET", `${SERVER_URL}/admin/all-placements?search=${searchKey}`)
}

// get single job detail
export const singleJobDetailAPI = async (jobId) => {
    return await CommonAPI("GET", `${SERVER_URL}/single-job/${jobId}`)
}

// user registration
export const userRegistrationAPI = async (reqBody) => {
    return await CommonAPI("POST", `${SERVER_URL}/user-register`, reqBody)
}


// User Login
export const userLoginAPI = async (reqBody) => {
    return await CommonAPI('POST', `${SERVER_URL}/user-login`, reqBody);
}

// get all users
export const getAllUsersAPI = async () => {
    return await CommonAPI("GET", `${SERVER_URL}/admin/allusers`)
}

// job apply form
export const jobApplicationAPI = async (reqBody, reqHeader) => {
    return await CommonAPI("POST", `${SERVER_URL}/job-apply`, reqBody, reqHeader)
}

// get all job applications
export const getAllJobApplicationsAPI = async () => {
    return await CommonAPI("GET", `${SERVER_URL}/admin/all-job-applications`)
}

// delete jobApplications
export const deleteJobApplicationsAPI = async (id) => {
    return await CommonAPI('DELETE', `${SERVER_URL}/admin/delete-jobapplications/${id}`, {})
}

// // delete users
export const deleteUsersAPI = async (id) => {
    return await CommonAPI('DELETE', `${SERVER_URL}/admin/delete-user/${id}`, {})
}

// delete placement
export const deletePlacementAPI = async (id) => {
    return await CommonAPI('DELETE', `${SERVER_URL}/admin/delete-placement/${id}`, {})
}

// edit placement
export const editPlacementAPI = async (_id, reqBody) => {
    return await CommonAPI("PUT", `${SERVER_URL}/admin/edit-placement/${_id}`, reqBody)
}

// // user interviews
// export const userInterviewsAPI = async (reqBody) => {
//     return await CommonAPI('GET', `${SERVER_URL}/user-interviews`,reqBody)
// }
export const userInterviewsAPI = async (userEmail) => {
    return await CommonAPI('GET', `${SERVER_URL}/user-interviews?userEmail=${userEmail}`);
};
