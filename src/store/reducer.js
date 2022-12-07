import {
    ADDFOODSELECTED,
    CLEARFOODSELECTED,
    EMPLOYEE,
    GETFOOD,
    GETTABLE,
    MESSAGE,
    REMOVEFOODSELECTED,
    TABLESERVING,
} from './constants';
import {
    addFoodSelected,
    clearFoodSelected,
    getFood,
    getTable,
    removeFoodSelected,
    setEmployee,
    setMessage,
    setTableServing,
} from './functions';
import { initState } from './state';

function reducer(state = initState, action) {
    switch (action.type) {
        case MESSAGE:
            return setMessage(state, action.payload);
        case EMPLOYEE:
            return setEmployee(state, action.payload);
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
        //TABLE
        case GETTABLE:
            return getTable(state, action.payload);
        default:
            return;
    }
}

export { initState };
export default reducer;
