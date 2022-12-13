import axios from 'axios';
import { URL } from './index';

export const getClientApi = async (data) => {
    return await axios.get(`${URL}client/${data}`).then((res) => {
        return res.data;
    });
};
