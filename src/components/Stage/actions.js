export const actionTypes = {
    ROOM_CREATED:"ROOM_CREATED"
}

export const roomCreated = (roomIdText)=>{
    return {
        type:actionTypes.ROOM_CREATED,
        payload: roomIdText
    }
}