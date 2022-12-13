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
