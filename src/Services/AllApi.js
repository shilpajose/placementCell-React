import { CommonAPI } from "./CommonAPI";
import { SERVER_URL } from "./SERVER_URL";

// Admin Login
export const adminLoginAPI = async(reqBody)=>{
    return await CommonAPI('POST',`${SERVER_URL}/admin-login`,reqBody);
}