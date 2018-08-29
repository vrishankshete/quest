export const actionTypes = {
    SHOW_LOADING: "SHOW_LOADING",
    HIDE_LOADING: "HIDE_LOADING"
};

export const showLoadingAction = () => ({
    type: actionTypes.SHOW_LOADING
});

export const hideLoadingAction = () => ({
    type: actionTypes.HIDE_LOADING
});