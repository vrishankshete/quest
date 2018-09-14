export const actionTypes = {
    ROOM_CREATED:"ROOM_CREATED",
    END_QUIZ:"END_QUIZ",
    SUBMIT_ANSWER: "SUBMIT_ANSWER",
    DISCONNECT: "DISCONNECT",
    RESET_ERROR: "RESET_ERROR",
    SET_ERROR: "SET_ERROR",
    RESET_ROOMID: "RESET_ROOMID"
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
export const disconnect = ()=>{
    return {
        type:actionTypes.DISCONNECT
    }
}
export const setError = (error)=>{
    return {
        type:actionTypes.SET_ERROR,
        payload: error
    }
}
export const resetError = ()=>{
    return {
        type:actionTypes.RESET_ERROR
    }
}
export const resetRoomId = ()=>{
    return {
        type:actionTypes.RESET_ROOMID
    }
}