import {combineReducers} from "redux";
import questionsReducer from "../components/Questions/reducer";
import loadingReducer from "../components/Loading/reducer";
import resultsReducer from "../components/Results/reducer";
import stageReducer from '../components/Stage/reducer';
import duoResultsReducer from '../components/DuoResults/reducer';
import homeReducer from '../components/Home/reducer';

export default combineReducers({
    questions: questionsReducer,
    loading: loadingReducer,
    results: resultsReducer,
    stage: stageReducer,
    duoResults: duoResultsReducer,
    home: homeReducer
});