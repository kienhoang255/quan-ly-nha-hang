import axios from 'axios';
import { URL } from './index';

export const resigter = (data) => {
    axios.post(`${URL}users/create`, data).then((res) => {
        console.log(res.data);
    });
};
