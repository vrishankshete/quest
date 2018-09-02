import { Map } from "immutable";
import { actionTypes } from "./actions";

const defaultState = Map({
    totalAttempted: 0,
    totalQuestions: 0,
    correctAnswers: 0
});

export default function(state = defaultState, action) {
    switch(action.type) {
        case actionTypes.RESET_SCORE:
            return defaultState;

        case actionTypes.CORRECT_ANSWER:
            return state.merge({totalAttempted: state.get('totalAttempted')+1, 
                totalQuestions: state.get('totalQuestions')+1,
                correctAnswers: state.get('correctAnswers')+1});

        case actionTypes.INCORRECT_ANSWER:
            return state.merge({totalAttempted: state.get('totalAttempted')+1, 
                totalQuestions: state.get('totalQuestions')+1});
        default:
            return state;
    }
}