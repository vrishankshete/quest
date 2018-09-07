import actionTypes from './actions';
import questionsActionTypes from '../Questions/actions';
import {Map} from "immutable";

const initialState = Map({
    selectedOption:-1,
    questionNumber:-1,
    question:"Question will appear here",
    options:[],
    answer:-1
});

export default function (state=initialState, action) {
    switch(action.type){

        case actionTypes.OPTION_CHANGED:
            return state.merge({selectedOption: action.payload});

        case questionsActionTypes.SET_QUESTION_OPTIONS:
            return state.merge({
                selectedOption:-1,
                questionNumber:action.payload.questionNumber,
                question:action.payload.question, 
                options:action.payload.options, 
                answer:action.payload.answer
            });

        default :
            return state;
    }
}