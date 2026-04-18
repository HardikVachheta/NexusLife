import axios from './axios';

export const fetchMailsByType = async (type) => {
    const response = await axios.get(`/mails/type/${type}`);
    return response.data;
};

export const addMails = async (mailData) => {
    try {
        const response = await axios.post('/mails', mailData);
        return response.data;
    } catch (error) {
        console.error('Failed to add mails:', error);
        throw error; // or return a custom error object if preferred
    }
};

export const updateMails = async (mailId, updatedData) => {
  const res = await axios.put(`/mails/${mailId}`, updatedData);
  return res.data;
};

export const deleteMails = async (mailId) => {
  const res = await axios.delete(`/mails/${mailId}`);
  return res.data;
};

export const summryMails = async () => {
  const res = await axios.get('/mails/summary');
  return res.data;
};
