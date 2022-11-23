import { EMPLOYEE, MESSAGE } from './constants';
import { setEmployee, setMessage } from './functions';
import { initState } from './state';

function reducer(state = initState, action) {
    switch (action.type) {
        case MESSAGE:
            return setMessage(state, action.payload);
        case EMPLOYEE:
            return setEmployee(state, action.payload);
        default:
            return;
    }
}

export { initState };
export default reducer;
