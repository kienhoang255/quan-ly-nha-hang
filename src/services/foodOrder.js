import axios from 'axios';
import { postFoodOrdered, postFoodServed } from '~/socketIO';
import { URL } from './index';

export const orderFoodApi = async (data) => {
    await axios.post(`${URL}food-ordered/`, data).then((res) => {
        postFoodOrdered(res.data);
    });
};

export const checkFoodOrderApi = async (data) => {
    return axios.get(`${URL}food-ordered/bill/${data}`).then((res) => {
        return res.data;
    });
};

export const getFoodOrderApi = async () => {
    return await axios.get(`${URL}food-ordered/`).then((res) => {
        return res.data;
    });
};

export const updateFoodServedApi = async (data) => {
    return axios.put(`${URL}food-ordered/served/`, data).then((res) => {
        postFoodServed(res.data);
        return res.data;
    });
};

export const updateFoodCancelApi = async (data) => {
    return axios.put(`${URL}food-ordered/cancel/`, data).then((res) => {
        return res.data;
    });
};
