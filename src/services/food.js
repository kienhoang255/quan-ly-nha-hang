import axios from 'axios';
import { URL } from './index';

export const addFood = (data) => {
    axios.post(`${URL}food/`, data).then((res) => {});
};
