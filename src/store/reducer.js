import {
    ADDBILL,
    ADDFOODSELECTED,
    ADD_FO,
    ADD_NEW_BILL,
    CLEARFOODSELECTED,
    EMPLOYEE,
    GETFOOD,
    GETTABLE,
    MESSAGE,
    REMOVEFOODSELECTED,
    SETUSER,
    TABLESERVING,
    UPDATETABLEUSING,
    UPDATE_FO,
    UPDATE_TABLE_USING,
} from './constants';
import {
    addBill,
    addFoodSelected,
    addNewBill,
    add_FO,
    clearFoodSelected,
    getFood,
    getTable,
    removeFoodSelected,
    setEmployee,
    setMessage,
    setTableServing,
    setUser,
    updateTableUsing,
    update_FO,
} from './functions';
import { initState } from './state';

function reducer(state = initState, action) {
    switch (action.type) {
        //USER
        case SETUSER:
            return setUser(state, action.payload);
        case MESSAGE:
            return setMessage(state, action.payload);
        case EMPLOYEE:
            return setEmployee(state, action.payload);
        //TABLESERVING
        case TABLESERVING:
            return setTableServing(state, action.payload);
        //FOOD
        case ADDFOODSELECTED:
            return addFoodSelected(state, action.payload);
        case REMOVEFOODSELECTED:
            return removeFoodSelected(state, action.payload);
        case CLEARFOODSELECTED:
            return clearFoodSelected(state);
        case GETFOOD:
            return getFood(state, action.payload);
        //FOOD_ORDERED
        case ADD_FO:
            return add_FO(state, action.payload);
        case UPDATE_FO:
            return update_FO(state, action.payload);
        //TABLE
        case GETTABLE:
            return getTable(state, action.payload);
        case UPDATE_TABLE_USING:
            return updateTableUsing(state, action.payload);
        //BILL
        case ADDBILL:
            return addBill(state, action.payload);
        case ADD_NEW_BILL:
            return addNewBill(state, action.payload);
        default:
            return;
    }
}

export { initState };
export default reducer;
