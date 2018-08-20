import React, { Component } from 'react';

import './SignUp.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setExpiration } from '../../../Store/Action/action';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class SignUp extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        cancel: false,
        spinner: false,
        error: false
    };

    AuthHandler = (event) => {
        event.preventDefault();

        this.setState({ spinner: true});

        const authData = {
            email: this.state.email, 
            password: this.state.password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC2HFJTLghiemHhDMAMiVWoixD7hI4bnhw', authData)
            .then( res => {
                console.log('Successful :', res);
                //redirecting to home page after successful signup
                const userData = {
                    userId: res.data.localId,
                    username: this.state.username
                }
                axios.post('https://app-ncj.firebaseio.com/user.json?auth='+ res.data.idToken, userData)
                    .then( response => {

                        this.setState({ spinner: false, error: false});

                        console.log('users-res :', response);
                        this.props.storeAuth(this.state.username, res.data.idToken, res.data.localId);
                        this.props.onStartUp(res.data.expiresIn);

                        const expirationDate = new Date( new Date().getTime + res.data.expiresIn*1000);
                        //Store token and username locally
                        localStorage.setItem('tokenId', res.data.idToken);
                        localStorage.setItem('userId', res.data.localId);
                        localStorage.setItem('username', this.state.username);
                        localStorage.setItem('expirationDate', expirationDate);
                        this.setState({cancel : true});
                    })
                    .catch( err => {
                        this.setState({ spinner: false, error: true});
                        this.props.onAuthFail(err);
                        console.log('Error :', err);
                    });
            })
            .catch( err => {
                this.setState({ spinner: false, error: true});
                this.props.onAuthFail(err);
                console.log('Error : ', err);
            });
    }

    cancelSignUpHandler = (event) => {
        event.preventDefault();
        console.log('Cancelled');
        this.setState({ cancel : true});
    }

    inputChangeHandler = (key, event) => {
        this.setState({
            [key] : event.target.value
        });
    }

    render (){
        let redirect = null;
        if(this.state.cancel)
            redirect  = <Redirect to="/" />;
        let formheading = <h3>SignUp Page</h3>;
        if(this.props.err && this.state.error){
            formheading = <h3 style={{color: 'red'}}>{this.props.err.response.data.error.message}</h3>;
        }    
        let form = <Spinner />;
        if(!this.state.spinner){
            form = (
                <div className="signup">
                {formheading}
                <form onSubmit={this.AuthHandler}>
                    <div>
                    <label >Full Name :
                        <input className="Input" 
                        type="text" 
                        placeholder="Your Full Name" 
                        required 
                        onChange={(event) => this.inputChangeHandler('username', event)}
                        value={this.state.username}/>
                    </label> 
                    </div>
                    
                    <div>
                    <label >Email Id :
                        <input className="Input" 
                        type="email" 
                        placeholder="example@example.com" 
                        required 
                        onChange={(event) => this.inputChangeHandler('email', event)}
                        value={this.state.email}/>
                    </label> 
                    </div>
                    
                    <div>
                    <label >Password :</label> 
                    <input className="Input" 
                    type="password" 
                    placeholder="Enter Password" 
                    required 
                    onChange={(event) => this.inputChangeHandler('password', event)}
                    value={this.state.password}
                    />
                    </div>
                    <button className="success" >SignUp</button>
                    <button className="failure" onClick={this.cancelSignUpHandler}>Cancel</button>
                </form>
            </div>  
            )
        }
        return (
            <div style={{ minHeight: '400px' }}>
                {redirect}
                {form}
            </div>  
        );
    }
}

const mapStateToProps = state => {
    return {
        err: state.error
    }
}


const mapDispatchToProps = dispatch => {
    return {
        storeAuth: (username, tokenId, userId) => dispatch({type: 'AUTH_STORE', username: username, tokenId: tokenId, userId: userId}),
        onStartUp: (expirationTime) => dispatch(setExpiration(expirationTime)),
        onAuthFail: (error) => dispatch({type: 'AUTH_FAIL', error: error})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp); 