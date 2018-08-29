import actionTypes from './actions'
import {Map} from "immutable";

const initialState = Map({
    questions:[]
});

export default function (state=initialState, action) {
    switch(action.type){
        case actionTypes.SET_QUESTIONS:
            return state.set("questions", action.payload);
        default :
            return state;
    }
}