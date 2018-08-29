import {fetchQuestionsServer} from './client';
import actionTypes from '../Questions/actions';
import {hideLoadingAction, showLoadingAction} from "../Loading/actions";
import {setQuestions, setQuestion} from "../Questions/actions";
import {call, put, takeLatest} from 'redux-saga/effects';
function* fetchQuestions(){
    yield put(showLoadingAction());
    try{
        const questions = yield call(fetchQuestionsServer);
        yield put(setQuestions(questions.data));
        yield put(setQuestion({question:questions.data[0].question,
            options: questions.data[0].options,
            answer: questions.data[0].answer}))
    }
    catch(e){
        yield alert(e);
    }
    yield put(hideLoadingAction());
}

export function* watchGetQuestions() {
    yield takeLatest(actionTypes.GET_QUESTIONS, fetchQuestions);
}