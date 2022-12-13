import {
    ADDBILL,
    ADDFOODSELECTED,
    ADD_FO,
    ADD_NEW_BILL,
    CLEARFOODSELECTED,
    EMPLOYEE,
    GETFOOD,
    GETTABLE,
    LOGIN,
    MESSAGE,
    REMOVEFOODSELECTED,
    RESIGTER,
    SETUSER,
    TABLESERVING,
    UPDATE_FO,
    UPDATE_TABLE_USING,
} from './constants';
//USER

export const setUser = (payload) => ({
    type: SETUSER,
    payload,
});

export const setResigter = (payload) => ({
    type: RESIGTER,
    payload,
});

export const setLogin = (payload) => ({
    type: LOGIN,
    payload,
});

export const setMessage = (payload) => ({
    type: MESSAGE,
    payload,
});

export const setEmployee = (payload) => ({
    type: EMPLOYEE,
    payload,
});

export const setTableServing = (payload) => ({
    type: TABLESERVING,
    payload,
});
//food
export const addFoodSelected = (payload) => ({
    type: ADDFOODSELECTED,
    payload,
});

export const removeFoodSelected = (payload) => ({
    type: REMOVEFOODSELECTED,
    payload,
});

export const clearFoodSelected = () => ({ type: CLEARFOODSELECTED });

export const getFood = (payload) => ({
    type: GETFOOD,
    payload,
});

//food ordered
export const addFO = (payload) => ({
    type: ADD_FO,
    payload,
});

export const updateFO = (payload) => ({
    type: UPDATE_FO,
    payload,
});

//table
export const getTable = (payload) => ({
    type: GETTABLE,
    payload,
});

export const updateTableUsing = (payload) => ({
    type: UPDATE_TABLE_USING,
    payload,
});

//bill
export const addBill = (payload) => ({
    type: ADDBILL,
    payload,
});

export const addNewBill = (payload) => ({
    type: ADD_NEW_BILL,
    payload,
});
