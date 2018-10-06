import {Map} from 'immutable';
import {actionTypes} from './actions'

const initialState = Map({
    hand:-1
});

export default function (state=initialState, action) {
    switch(action.type){
        case actionTypes.SET_HAND:
            return state.set("hand", action.payload);
        default :
            return state;
    }
}