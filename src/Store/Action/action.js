

export const setExpiration = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch({ type: 'AUTH_STORE', username: null, tokenId: null, userId: null });
        }, expirationTime*1000);
    }
}


