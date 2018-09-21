import { actionTypes as homeActions } from '../Home/actions';
import { hideLoadingAction, showLoadingAction } from "../Loading/actions";
import { setQuestion } from "../Questions/actions";
import { endQuiz, setError, resetStage, disconnectGame, actionTypes as stageActions } from '../Stage/actions';
import { setDuoScore } from '../DuoResults/actions';
import { roomCreated } from './actions';
import { fork, take, call, put, takeLatest, cancel } from 'redux-saga/effects';
import { socketServerURL } from '../../config/config';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';

function connect() {
    const socket = io(socketServerURL);
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket);
        });
    });
}

function subscribe(socket) {
    return eventChannel(emit => {
        socket.on('room created', quizRef=>emit(roomCreated(quizRef)));
        socket.on('quiz started', () => emit(hideLoadingAction()));
        socket.on('question', QObj => {
            let {questionNumber, question} = QObj;
            emit(setQuestion({...question, questionNumber}));
        });
        socket.on('end quiz', score => {
            emit(setDuoScore(score));
            emit(endQuiz(socket.id));
        });
        socket.on('app error', error=>{
            emit(setError(error.code));
            emit(resetStage());
            emit(hideLoadingAction());
            emit(disconnectGame());
        });
        socket.on('disconnect', e => {
            emit(resetStage());
        });
        return () => {};
    });         
}

function* read(socket) {
    const channel = yield call(subscribe, socket);
    while (true) {
        let action = yield take(channel);
        yield put(action);
    }
}

function* write(socket) {
    while (true) {
        const { payload } = yield take(stageActions.SUBMIT_ANSWER);
        socket.emit('answer', payload);
    }
}

function* handleIO(socket) {
    yield fork(read, socket);
    yield fork(write, socket);
}

function* createRoom(){
    try{
        //yield put(showLoadingAction("Share this room id with opponent. Wait for him to join..."));
        const socket = yield call(connect);
        socket.emit('create room');
        const task = yield fork(handleIO, socket);
        yield take(stageActions.DISCONNECT_GAME);
        yield cancel(task);
        socket.emit('logout');
        socket.disconnect();
    }
    catch(e){
        alert(e);
    }
    // yield put(hideLoadingAction());
}

function* joinRoom(action){
    try{
        //yield put(showLoadingAction("Waiting for others to join..."));
        const socket = yield call(connect);
        socket.emit('join room', action.payload);
        const task = yield fork(handleIO, socket);
        yield take(stageActions.DISCONNECT_GAME);
        yield cancel(task);
        socket.emit('logout');
        socket.disconnect();
    }
    catch(e){
        alert(e);
    }
}

export function* watchCreateRoom() {
    yield takeLatest(homeActions.CREATE_ROOM, createRoom);
}

export function* watchJoinRoom() {
    yield takeLatest(homeActions.JOIN_ROOM, joinRoom);
}