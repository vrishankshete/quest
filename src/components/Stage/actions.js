export const actionTypes = {
    ROOM_CREATED:"ROOM_CREATED",
    END_QUIZ:"END_QUIZ",
    SUBMIT_ANSWER: "SUBMIT_ANSWER",
    DISCONNECT_GAME: "DISCONNECT_GAME",
    SET_ERROR: "SET_ERROR",
    RESET_ROOMID: "RESET_ROOMID",
    RESET_STAGE: "RESET_STAGE",
    SET_OPPONENT_ANSWER: "SET_OPPONENT_ANSWER"
}
export const roomCreated = (roomIdText)=>{
    return {
        type:actionTypes.ROOM_CREATED,
        payload: roomIdText
    }
}
export const submitAnswer = (answer)=>{
    return {
        type:actionTypes.SUBMIT_ANSWER,
        payload: answer
    }
}
export const endQuiz = (socketId)=>{
    return {
        type:actionTypes.END_QUIZ,
        payload: socketId
    }
}
export const disconnectGame = ()=>{
    return {
        type:actionTypes.DISCONNECT_GAME
    }
}
export const setError = (error)=>{
    return {
        type:actionTypes.SET_ERROR,
        payload: error
    }
}
export const resetRoomId = ()=>{
    return {
        type:actionTypes.RESET_ROOMID
    }
}
export const resetStage = ()=>{
    return {
        type:actionTypes.RESET_STAGE
    }
}
export const setOpponentAnswer = (opponentAns)=>{
    return {
        type:actionTypes.SET_OPPONENT_ANSWER,
        payload: opponentAns
    }
}