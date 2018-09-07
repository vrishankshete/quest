import { Map } from "immutable";
import { actionTypes } from "./actions";

const defaultState = Map({
    roomId: null,
});

export default function(state = defaultState, action) {
    switch(action.type) {
        case actionTypes.ROOM_CREATED:
            return state.set("roomId", action.payload);
        default:
            return state;
    }
}