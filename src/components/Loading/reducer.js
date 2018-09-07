import { Map } from "immutable";
import { actionTypes } from "./actions";

const defaultState = Map({
    isLoading: false,
    loadCounter: 0,
    loadingMessage: 'Loading... Please wait...'
});

export default function(state = defaultState, action) {
    let loadCounter = state.get('loadCounter');
    let loadingMessage = state.get('loadingMessage');
    if (loadCounter < 0) { loadCounter = 0;}

    switch(action.type) {
        case actionTypes.SHOW_LOADING:
            loadCounter++;
            loadingMessage = action.message;
            break;
        case actionTypes.HIDE_LOADING:
            loadCounter--;
            break;
    }
    return state.merge({isLoading: loadCounter > 0, loadCounter: loadCounter, loadingMessage})
}