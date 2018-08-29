const actionTypes = {
    OPTION_CHANGED:"OPTION_CHANGED",
}

export const optionChanged = (selectedOption)=>{
    return {
        type:actionTypes.OPTION_CHANGED,
        payload:selectedOption
    }
}

export default actionTypes;