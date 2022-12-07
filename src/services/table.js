import axios from 'axios';
import { actions } from '~/store';
import { URL } from './index';

export const addFood = (data) => {
    axios.post(`${URL}food/`, data).then((res) => {});
};

export const getTable = (dispatch) => {
    axios.get(`${URL}table/`).then((res) => {
        dispatch(actions.getTable(res.data));
    });
};
