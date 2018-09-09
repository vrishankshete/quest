import { Map } from "immutable";
import { actionTypes } from "./actions";

const defaultState = Map({
    score: {}
});

export default function(state = defaultState, action) {
    switch(action.type) {
        case actionTypes.SET_DUO_SCORE:
            return state.set('score', action.score);

        default:
            return state;
    }
}