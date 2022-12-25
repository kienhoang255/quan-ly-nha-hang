import {
    ADDBILL,
    ADDFOODSELECTED,
    ADD_EMPLOYEE,
    ADD_FO,
    ADD_FOOD,
    ADD_ITEM_FO,
    ADD_NEW_BILL,
    ADD_NOTIFICATION,
    ADD_TABLE,
    CLEARFOODSELECTED,
    DELETE_FOOD,
    DELETE_TABLE,
    DEL_EMPLOYEE,
    EMPLOYEE,
    GETFOOD,
    GETTABLE,
    LOGIN,
    MESSAGE,
    REMOVEFOODSELECTED,
    RESIGTER,
    SETUSER,
    TABLESERVING,
    UPDATE_EMPLOYEE,
    UPDATE_FO,
    UPDATE_FOOD,
    UPDATE_TABLE,
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
//EMPLOYEE
export const setEmployee = (payload) => ({
    type: EMPLOYEE,
    payload,
});

export const updateEmployee = (payload) => ({
    type: UPDATE_EMPLOYEE,
    payload,
});

export const addEmployee = (payload) => ({
    type: ADD_EMPLOYEE,
    payload,
});

export const delEmployee = (payload) => ({
    type: DEL_EMPLOYEE,
    payload,
});
//TABLESERVING
export const setTableServing = (payload) => ({
    type: TABLESERVING,
    payload,
});

//TABLE
export const getTable = (payload) => ({
    type: GETTABLE,
    payload,
});

export const addTable = (payload) => ({
    type: ADD_TABLE,
    payload,
});

export const updateTable = (payload) => ({
    type: UPDATE_TABLE,
    payload,
});

export const deleteTable = (payload) => ({
    type: DELETE_TABLE,
    payload,
});

export const updateTableUsing = (payload) => ({
    type: UPDATE_TABLE_USING,
    payload,
});
//FOOD
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

export const addFood = (payload) => ({
    type: ADD_FOOD,
    payload,
});
export const updateFood = (payload) => ({
    type: UPDATE_FOOD,
    payload,
});

export const deleteFood = (payload) => ({
    type: DELETE_FOOD,
    payload,
});

//FOOD ORDERED
export const addFO = (payload) => ({
    type: ADD_FO,
    payload,
});

export const updateFO = (payload) => ({
    type: UPDATE_FO,
    payload,
});

export const addItemFO = (payload) => ({
    type: ADD_ITEM_FO,
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
//NOTIFICATION

export const addNotification = (payload) => ({
    type: ADD_NOTIFICATION,
    payload,
});
