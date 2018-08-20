
const initialState = {
    username: null,
    tokenId : null,
    userId: null,
    error: null
}

const reducer = (state = initialState, action) => {
    if(action.type === 'AUTH_STORE'){
        if(!action.tokenId && !action.username && !action.userId){
            localStorage.removeItem('tokenId');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            localStorage.removeItem('expirationDate');
        }
       
        return {
            ...initialState,
            username: action.username,
            tokenId: action.tokenId,
            userId: action.userId
        }
    }
    if(action.type === 'AUTH_FAIL'){
        return {
            ...initialState,
            error: action.error
        }
    }
    return state;
}

export default reducer;
