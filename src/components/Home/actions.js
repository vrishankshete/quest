export const actionTypes = {
    CREATE_ROOM:"CREATE_ROOM",
    JOIN_ROOM:"JOIN_ROOM"
}

export const createRoom = ()=>{
    return {
        type:actionTypes.CREATE_ROOM,
    }
}

export const joinRoom = (roomIdText)=>{
    return {
        type:actionTypes.JOIN_ROOM,
        payload: roomIdText
    }
}