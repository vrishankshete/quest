export const actionTypes = {
    SET_DUO_SCORE: "SET_DUO_SCORE"
};

export const setDuoScore = (score) => ({
    type: actionTypes.SET_DUO_SCORE,
    score
});