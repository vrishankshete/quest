export const actionTypes = {
    ROOM_CREATED:"ROOM_CREATED",
    END_QUIZ:"END_QUIZ",
    SUBMIT_ANSWER: "SUBMIT_ANSWER"
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

export const endQuiz = ()=>{
    return {
        type:actionTypes.END_QUIZ
    }
}