import {
    ADDFOODSELECTED,
    ADDTABLE,
    CLEARFOODSELECTED,
    EMPLOYEE,
    GETFOOD,
    GETTABLE,
    LOGIN,
    MESSAGE,
    REMOVEFOODSELECTED,
    RESIGTER,
    TABLESERVING,
} from './constants';

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

//table
export const getTable = (payload) => ({
    type: GETTABLE,
    payload,
});
