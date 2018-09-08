import { Map } from "immutable";
import { actionTypes } from "./actions";
import { actionTypes as questionsActionTypes } from '../Questions/actions';

const defaultState = Map({
    roomId: null,
    currentQuestion:Map({questionNumber:-1,
                        question:"Question will appear here",
                        options:[],
                        answer:-1
                    })
});

export default function(state = defaultState, action) {
    switch(action.type) {
        case actionTypes.ROOM_CREATED:
            return state.set("roomId", action.payload);

        case questionsActionTypes.SET_QUESTION_OPTIONS:
            let currentQuestion = state.get('currentQuestion');
            return state.set('currentQuestion', currentQuestion.merge({
                    questionNumber:action.payload.questionNumber,
                    question:action.payload.question, 
                    options:action.payload.options, 
                    answer:action.payload.answer
                }));
        default:
            return state;
    }
}