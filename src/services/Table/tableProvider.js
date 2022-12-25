import axios from 'axios';
import { URL } from '../index';
import { handleGetTableError, handleGetTableResponse } from './tableResponse';

const BASE_URL = `${URL}table`;
export const getTableProvider = async () => {
    return await axios.get(`${BASE_URL}`).then(handleGetTableResponse).catch(handleGetTableError);
};

const getAll = async () => {
    return await axios.get(`${BASE_URL}`).then(handleGetTableResponse).catch(handleGetTableError);
};

export const addNewTableApi = async (data) => {
    return await axios
        .post(`${BASE_URL}`, data)
        .then((res) => res.data)
        .catch((err) => err);
};

export const updateTableApi = async (data) => {
    return await axios
        .put(`${BASE_URL}`, data)
        .then((res) => res.data)
        .catch((err) => err);
};

export const deleteTableApi = async (data) => {
    return await axios
        .delete(`${BASE_URL}/${data}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
};
