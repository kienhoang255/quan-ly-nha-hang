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
    MESSAGE,
    REMOVEFOODSELECTED,
    SETUSER,
    TABLESERVING,
    UPDATE_EMPLOYEE,
    UPDATE_FO,
    UPDATE_FOOD,
    UPDATE_TABLE,
    UPDATE_TABLE_USING,
} from './constants';
import {
    addBill,
    addEmployee,
    addFood,
    addFoodSelected,
    addItemFO,
    addNewBill,
    addNotification,
    addTable,
    add_FO,
    clearFoodSelected,
    delEmployee,
    deleteFood,
    deleteTable,
    getFood,
    getTable,
    removeFoodSelected,
    setEmployee,
    setMessage,
    setTableServing,
    setUser,
    updateEmployee,
    updateFood,
    updateTable,
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

        //EMPLOYEE
        case EMPLOYEE:
            return setEmployee(state, action.payload);
        case UPDATE_EMPLOYEE:
            return updateEmployee(state, action.payload);
        case ADD_EMPLOYEE:
            return addEmployee(state, action.payload);
        case DEL_EMPLOYEE:
            return delEmployee(state, action.payload);

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
        case ADD_FOOD:
            return addFood(state, action.payload);
        case UPDATE_FOOD:
            return updateFood(state, action.payload);
        case DELETE_FOOD:
            return deleteFood(state, action.payload);

        //FOOD_ORDERED
        case ADD_FO:
            return add_FO(state, action.payload);
        case UPDATE_FO:
            return update_FO(state, action.payload);
        case ADD_ITEM_FO:
            return addItemFO(state, action.payload);

        //TABLE
        case GETTABLE:
            return getTable(state, action.payload);
        case ADD_TABLE:
            return addTable(state, action.payload);
        case UPDATE_TABLE:
            return updateTable(state, action.payload);
        case DELETE_TABLE:
            return deleteTable(state, action.payload);
        case UPDATE_TABLE_USING:
            return updateTableUsing(state, action.payload);

        //BILL
        case ADDBILL:
            return addBill(state, action.payload);
        case ADD_NEW_BILL:
            return addNewBill(state, action.payload);
        //NOTIFICATION
        case ADD_NOTIFICATION:
            return addNotification(state, action.payload);
        default:
            return;
    }
}

export { initState };
export default reducer;
