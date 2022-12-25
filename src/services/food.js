import axios from 'axios';
import { URL } from './index';

export const addFoodApi = (data) => {
    return axios.post(`${URL}food/`, data).then((res) => res.data);
};

export const updateFoodApi = (data) => {
    return axios.put(`${URL}food/`, data).then((res) => res.data);
};

export const deleteFoodApi = (data) => {
    return axios.delete(`${URL}food/${data}`).then((res) => res.data);
};
