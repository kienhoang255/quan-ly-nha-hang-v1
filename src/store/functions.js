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