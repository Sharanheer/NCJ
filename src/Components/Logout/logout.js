import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const logout = (props) => {
    localStorage.removeItem('tokenId');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate');
    props.storeAuth(null,null,null);
    return (
        <Redirect to="/" />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        storeAuth: (username, tokenId, userId) => dispatch({type: 'AUTH_STORE', username: username, tokenId: tokenId, userId: userId})
    }
}

export default connect(null,mapDispatchToProps)(logout);