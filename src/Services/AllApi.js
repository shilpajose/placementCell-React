import { CommonAPI } from "./CommonAPI";
import { SERVER_URL } from "./SERVER_URL";

// Admin Login
export const adminLoginAPI = async(reqBody)=>{
    return await CommonAPI('POST',`${SERVER_URL}/admin-login`,reqBody);
}

// admin add placements 
export const addPlacementsAPI = async(reqBody)=>{
    return await CommonAPI("POST",`${SERVER_URL}/admin/add-placements`,reqBody)
}

// get all placements
export const getAllPlacementsAPI = async()=>{
    return await CommonAPI("GET",`${SERVER_URL}/admin/all-placements`)
}