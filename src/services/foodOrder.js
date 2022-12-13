import axios from 'axios';
import { actions } from '~/store';
import { URL } from './index';

export const orderFoodApi = (data) => {
    axios.post(`${URL}food-ordered/`, data).then((res) => {
        // console.log(res.data);
    });
};

export const checkFoodOrderApi = async (data) => {
    return axios.get(`${URL}food-ordered/bill/${data}`).then((res) => {
        return res.data;
    });
};

export const getFoodOrderApi = async () => {
    return axios.get(`${URL}food-ordered/`).then((res) => {
        return res.data;
    });
};

export const updateFoodServedApi = async (data) => {
    return axios.put(`${URL}food-ordered/served/`, data).then((res) => {
        return res.data;
    });
};

export const updateFoodCancelApi = async (data) => {
    return axios.put(`${URL}food-ordered/cancel/`, data).then((res) => {
        return res.data;
    });
};
