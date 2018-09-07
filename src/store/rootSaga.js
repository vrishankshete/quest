import { all } from 'redux-saga/effects';
import { watchGetQuestions } from '../components/Questions/sagas';
import { watchCreateRoom, watchJoinRoom } from '../components/Stage/sagas';

export function* rootSaga() {
 yield all([
  watchGetQuestions(), watchCreateRoom(), watchJoinRoom()
 ]);
}