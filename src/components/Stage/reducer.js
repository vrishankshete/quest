import { Map } from "immutable";
import { actionTypes } from "./actions";
import { actionTypes as questionsActionTypes } from '../Questions/actions';

const defaultState = Map({
    roomId: null,
    currentQuestion:Map({questionNumber:-1,
                        question:"Question will appear here",
                        options:[],
                        answer:-1
                    }),
    quizEnded: false,
    socketId: null,
    error: null,
    opponentAnswer: -1
});

export default function(state = defaultState, action) {
    switch(action.type) {
        case actionTypes.ROOM_CREATED:
            return state.merge({roomId: action.payload, quizEnded: false});
        
        case actionTypes.END_QUIZ:
            return state.merge({quizEnded: true, socketId: action.payload});

        case questionsActionTypes.SET_QUESTION_OPTIONS:
            let currentQuestion = state.get('currentQuestion');
            return state.set('currentQuestion', currentQuestion.merge({
                    questionNumber:action.payload.questionNumber,
                    question:action.payload.question, 
                    options:action.payload.options, 
                    answer:action.payload.answer
                }));
        case actionTypes.SET_ERROR:
                return state.merge({error: action.payload});
        case actionTypes.SET_OPPONENT_ANSWER:
                return state.merge({opponentAnswer: action.payload});
        case actionTypes.RESET_ROOMID:
                return state.merge({roomId: defaultState.roomId});
        case actionTypes.RESET_STAGE:
                return defaultState;
        default:
            return state;
    }
}