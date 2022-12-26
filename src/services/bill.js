import axios from 'axios';
// import { postBill, postTable } from '~/socketIO';
import { actions } from '~/store';
import { URL } from './index';

export const clientCheckIn = (dispatch, data) => {
    axios
        .post(`${URL}bill/`, data)
        .then((res) => {
            // dispatch(actions.addNewBill(res.data.createBill1));
            // postBill(res.data.createBill1);
            // postTable(res.data.table);
            dispatch(actions.setMessage({ message: 'Chúc bạn ngon miệng ^^' }));
        })
        .catch((err) => {
            dispatch(actions.setMessage(err.response));
        });
};

export const getBillApi = async () => {
    return await axios.get(`${URL}bill`).then((res) => {
        return res.data;
    });
};

export const checkOutApi = async (dispatch, data) => {
    return await axios.post(`${URL}bill/check-out`, data).then((res) => {
        // postTable(res.data.table);
        return res.data;
    });
};
