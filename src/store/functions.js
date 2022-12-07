export const addInfo = (state, payload) => {
    const newState = {
        ...state,
        auth: { ...state.auth, info: payload.user, token: payload.token, login: true },
    };
    return newState;
};

export const removeInfo = (state, options) => {
    const newState = { ...state, auth: { ...state.auth, [options]: { ...state.auth[options], info: '' } } };
    return newState;
};

export const setMessage = (state, payload) => {
    const newState = { ...state, MESSAGE: payload };
    return newState;
};

export const setEmployee = (state, payload) => {
    const newState = { ...state, EMPLOYEE: payload };
    return newState;
};

export const setTableServing = (state, payload) => {
    const newState = { ...state, TABLESERVING: payload };
    return newState;
};

export const addFoodSelected = (state, payload) => {
    /**
     * IF FOODSELECTED null => add new
     * ELSE
     *   IF _id exist
     *      remove item has _id => add new and quantity +1
     *   ELSE => add new
     */

    /**
     * ...
     * All correct but when update food in first list, i got bug
     * Cant explain but i know how to solve
     * When found food need update, i put that to last place in array => solved
     */
    let result;
    const { _id, price, name } = payload;
    if (state.FOODSELECTED[0] === undefined) {
        result = { ...state, FOODSELECTED: [...state.FOODSELECTED, { _id, price, name, quantity: 1 }] };
    } else {
        const foodIndex = state.FOODSELECTED.findIndex((food) => food._id === _id);

        state.FOODSELECTED.forEach((element) => {
            if (element._id === _id) {
                //remove && add
                state.FOODSELECTED.push(state.FOODSELECTED.splice(foodIndex, 1)[0]);

                const removeFood = {
                    ...state,
                    FOODSELECTED: state.FOODSELECTED.filter((food) => food._id !== _id),
                };
                const newQuantity = element.quantity + 1;
                result = {
                    ...removeFood,
                    FOODSELECTED: [...removeFood.FOODSELECTED, { _id, price, name, quantity: newQuantity }],
                };
            } else {
                result = { ...state, FOODSELECTED: [...state.FOODSELECTED, { _id, price, name, quantity: 1 }] };
            }
        });
    }
    return result;
};

export const removeFoodSelected = (state, payload) => {
    /**
     * findFood if found
     *      check food quantity
     *          if food quantity = 0
     *              delete food
     *          else
     *              quantity - 1
     */
    let result = state;
    const { _id, price, name } = payload;
    const findFood = state.FOODSELECTED.find((food) => food._id === payload._id);
    if (findFood) {
        const newQuantity = findFood?.quantity - 1;
        if (newQuantity === 0) {
            result = {
                ...state,
                FOODSELECTED: state.FOODSELECTED.filter((food) => food._id !== payload._id),
            };
        } else {
            const removeFood = {
                ...state,
                FOODSELECTED: state.FOODSELECTED.filter((food) => food._id !== payload._id),
            };
            result = {
                ...removeFood,
                FOODSELECTED: [...removeFood.FOODSELECTED, { _id, price, name, quantity: newQuantity }],
            };
        }
    }
    return result;
};

export const clearFoodSelected = (state) => {
    return {
        ...state,
        FOODSELECTED: [],
    };
};

export const getFood = (state, payload) => {
    return {
        ...state,
        FOODS: payload,
    };
};

export const getTable = (state, payload) => {
    return {
        ...state,
        TABLES: payload,
    };
};
