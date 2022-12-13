import axios from 'axios';
// import { postTable } from '~/socketIO/tableSocket';
import { actions } from '~/store';
import { URL } from './index';

export const clientCheckIn = (dispatch, data) => {
    axios
        .post(`${URL}bill/`, data)
        .then((res) => {
            dispatch(actions.addNewBill(res.data.createBill1));
            dispatch(actions.updateTableUsing(res.data.table));
            // postTable(res.data);
            dispatch(actions.setMessage('Xin chào, chúc bạn ngon miệng ^^'));
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

export const checkOutApi = async (data) => {
    return await axios.post(`${URL}bill/check-out`, data).then((res) => {
        return res.data;
    });
};
