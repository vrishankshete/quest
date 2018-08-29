import { Map } from "immutable";
import { actionTypes } from "./actions";

const defaultState = Map({
    isLoading: false,
    loadCounter: 0
});

export default function(state = defaultState, action) {
    let loadCounter = state.get('loadCounter');
    if (loadCounter < 0) { loadCounter = 0;}
    switch(action.type) {
        case actionTypes.SHOW_LOADING:
            loadCounter++;
            break;
        case actionTypes.HIDE_LOADING:
            loadCounter--;
            break;
    }
    return state.merge({isLoading: loadCounter > 0, loadCounter: loadCounter})
}