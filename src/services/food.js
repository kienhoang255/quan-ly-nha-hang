import axios from 'axios';
import { actions } from '~/store';
import { URL } from './index';

export const addFood = (data) => {
    axios.post(`${URL}food/`, data).then((res) => {});
};

export const getFood = (dispatch) => {
    axios.get(`${URL}food/`).then((res) => {
        dispatch(actions.getFood(res.data));
    });
};
