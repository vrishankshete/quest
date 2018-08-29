import {combineReducers} from "redux";
import questionReducer from "../components/Question/reducer";
import questionsReducer from "../components/Questions/reducer";
import loadingReducer from "../components/Loading/reducer";

export default combineReducers({
    question: questionReducer,
    questions: questionsReducer,
    loading: loadingReducer
});