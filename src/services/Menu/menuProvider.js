import axios from 'axios';
import { URL } from '../index';
import { handleGetMenuError, handleGetMenuResponse } from './menuResponse';

const BASE_URL = `${URL}food`;
export const getMenuProvider = async () => {
    return axios.get(`${BASE_URL}`).then(handleGetMenuResponse).catch(handleGetMenuError);
};
