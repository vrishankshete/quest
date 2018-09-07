import {actionTypes as homeActions} from '../Home/actions';
import {hideLoadingAction, showLoadingAction} from "../Loading/actions";
import {setQuestion} from "../Questions/actions";
import {roomCreated} from './actions';
import {fork, take, call, put, takeLatest} from 'redux-saga/effects';
import {socketServerURL} from '../../config/config';
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
        socket.on('disconnect', e => {
            // TODO: handle
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

// function* write(socket) {
//     while (true) {
//         const { payload } = yield take(`${sendMessage}`);
//         socket.emit('message', payload);
//     }
// }

function* handleIO(socket) {
    yield fork(read, socket);
    //yield fork(write, socket);
}

function* createRoom(){
    yield put(showLoadingAction("Share this room id with opponent. Wait for him to join..."));
    try{
        const socket = yield call(connect);
        socket.emit('create room');
        const task = yield fork(handleIO, socket);
    }
    catch(e){
        alert(e);
    }
    // yield put(hideLoadingAction());
}

function* joinRoom(action){
    const socket = yield call(connect);
    socket.emit('join room', action.payload);
    const task = yield fork(handleIO, socket);
}

export function* watchCreateRoom() {
    yield takeLatest(homeActions.CREATE_ROOM, createRoom);
}

export function* watchJoinRoom() {
    yield takeLatest(homeActions.JOIN_ROOM, joinRoom);
}