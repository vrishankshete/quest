export const actionTypes = {
    SET_QUESTIONS:"SET_QUESTIONS",
    SET_QUESTION_OPTIONS:"SET_QUESTION_OPTIONS",
    GET_QUESTIONS:"GET_QUESTIONS",
    RESET_QUESTIONS:"RESET_QUESTIONS"
}

export const setQuestions = (questions)=>{
    return {
        type:actionTypes.SET_QUESTIONS,
        payload:questions
    }
}

export const setQuestion = (questionObj)=>{
    return {
        type:actionTypes.SET_QUESTION_OPTIONS,
        payload:questionObj
    }
}

export const getQuestions = ()=>{
    return {
        type:actionTypes.GET_QUESTIONS
    }
}

export const resetQuestions = ()=>{
    return {
        type:actionTypes.RESET_QUESTIONS
    }
}