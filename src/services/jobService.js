import axios from './axios';

export const fetchJobByCompanyName = async (companyName) => {
    try {
        const response = await axios.get(`/job/${companyName}`);
        return response.data;
    } catch (error) {
        console.error('Failed :', error);
        throw error; // or return a custom error object if preferred
    }
};