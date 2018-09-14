import {fetchQuestionsOpentdb} from './client';
import {actionTypes} from '../Questions/actions';
import {hideLoadingAction, showLoadingAction} from "../Loading/actions";
import {setQuestions} from "../Questions/actions";
import {call, put, takeLatest} from 'redux-saga/effects';
import {getFormattedQuestions} from '../Helper/requestHelper';

function* fetchQuestions(){
    yield put(showLoadingAction("Fetching Questions from Server..."));
    try{
        const questions = yield call(fetchQuestionsOpentdb);
        let formattedQs = getFormattedQuestions(questions.data.results);
        yield put(setQuestions(formattedQs));
    }
    catch(e){
        alert(e);
    }
    yield put(hideLoadingAction());
}

export function* watchGetQuestions() {
    yield takeLatest(actionTypes.GET_QUESTIONS, fetchQuestions);
}