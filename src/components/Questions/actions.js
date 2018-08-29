const actionTypes = {
    SET_QUESTIONS:"SET_QUESTIONS",
    SET_QUESTION_OPTIONS:"SET_QUESTION_OPTIONS",
    GET_QUESTIONS:"GET_QUESTIONS",
    NEXT_QUESTION:"NEXT_QUESTION"
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

export const nextQuestion = ()=>{
    return {
        type:actionTypes.NEXT_QUESTION
    }
}

export default actionTypes;