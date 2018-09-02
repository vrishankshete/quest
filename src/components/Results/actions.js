export const actionTypes = {
    INCORRECT_ANSWER: "INCORRECT_ANSWER",
    CORRECT_ANSWER: "CORRECT_ANSWER",
    RESET_SCORE: "RESET_SCORE"
};

export const correctAnswerAction = () => ({
    type: actionTypes.CORRECT_ANSWER
});

export const incorrectAnswerAction = () => ({
    type: actionTypes.INCORRECT_ANSWER
});

export const resetScoreAction = () => ({
    type: actionTypes.RESET_SCORE
});