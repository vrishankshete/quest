import { fork, all } from 'redux-saga/effects';
import { watchGetQuestions } from '../components/Questions/sagas';

export function* rootSaga() {
 yield all([
  watchGetQuestions()
 ]);
}