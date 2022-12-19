export const setUser = (state, payload) => {
    return { ...state, USER: payload };
};
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
//TABLESERVING
export const setTableServing = (state, payload) => {
    const newState = { ...state, TABLESERVING: payload };
    return newState;
};
//TABLE
export const updateTableUsing = (state, payload) => {
    return {
        ...state,
        TABLES:
            // ...state.TABLES,
            state.TABLES.map((e) => {
                if (e._id === payload._id) {
                    return payload;
                } else return e;
            }),
    };
};

export const getTable = (state, payload) => {
    return {
        ...state,
        TABLES: payload,
    };
};
//FOOD
export const addFoodSelected = (state, payload) => {
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

//FOOD ORDERED
export const add_FO = (state, payload) => {
    return { ...state, FOOD_ORDERED: payload };
};

export const update_FO = (state, payload) => {
    return {
        ...state,
        FOOD_ORDERED: state.FOOD_ORDERED.map((e) => {
            if (e._id === payload._id) {
                return payload;
            } else return e;
        }),
    };
};

export const addItemFO = (state, payload) => {
    const FORaw = [...new Set(state.FOOD_ORDERED)];
    payload.forEach((e) => FORaw.push(e));
    // const setFO = [...new Set(FORaw)];
    // console.log(setFO);
    // return { ...state, FOOD_ORDERED: setFO };
    return { ...state, FOOD_ORDERED: FORaw };
};

//BILL
export const addBill = (state, payload) => {
    return {
        ...state,
        BILLS: payload,
    };
};

export const addNewBill = (state, payload) => {
    return {
        ...state,
        BILLS: [...state.BILLS, payload],
    };
};

//NOTIFICATION
export const addNotification = (state, payload) => {
    return { ...state, NOTIFICATION: [...state.NOTIFICATION, payload] };
};
