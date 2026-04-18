import axios from './axios';

// export const fetchCompanies = () => axios.get('/companies');

// export const addCompany = (data) => axios.post('/companies', data);

export const fetchCompanies = async () => {
    const response = await axios.get('/companies');
    return response.data;
};

export const addCompany = async (companyData) => {
    const response = await axios.post('/companies', companyData);
    return response.data;
};