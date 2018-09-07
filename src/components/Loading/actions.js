export const actionTypes = {
    SHOW_LOADING: "SHOW_LOADING",
    HIDE_LOADING: "HIDE_LOADING"
};

export const showLoadingAction = (message) => ({
    type: actionTypes.SHOW_LOADING,
    message
});

export const hideLoadingAction = () => ({
    type: actionTypes.HIDE_LOADING
});