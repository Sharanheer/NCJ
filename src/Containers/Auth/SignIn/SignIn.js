import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import './SignIn.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { setExpiration } from '../../../Store/Action/action';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class SignIn extends Component {

    state = {
        email: '',
        password: '',
        cancel: false,
        switchToSignUp: false,
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
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC2HFJTLghiemHhDMAMiVWoixD7hI4bnhw', authData)
            .then( res => {
                console.log('Successful :', res);
                //redirecting to home page after successful signup
                axios.get('https://app-ncj.firebaseio.com/user.json?auth='+ res.data.idToken)
                    .then( response => {

                        this.setState({ spinner: false, error: false});
                        console.log('users-res :', response.data);
                        for(let key in response.data){
                            if(response.data[key]['userId'] === res.data.localId){
                                console.log('response.data[key][username] :', response.data[key]['username']);
                                this.props.storeAuth( response.data[key]['username'],res.data.idToken, res.data.localId);
                                this.props.onStartUp(res.data.expiresIn);

                                const expirationDate = new Date( new Date().getTime() + (res.data.expiresIn * 1000));
                                //Store token and username locally
                                localStorage.setItem('tokenId', res.data.idToken);
                                localStorage.setItem('userId', res.data.localId);
                                localStorage.setItem('username', response.data[key]['username']);
                                localStorage.setItem('expirationDate', expirationDate);
                                this.setState({cancel : true});
                                return;
                            }
                        }
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
                console.log('main-Error : ', err);
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

    toggleHandler = () => {
        this.setState({
            switchToSignUp: true
        });
    }

    render (){
        let redirect = null;
        if(this.state.cancel)
            redirect  = <Redirect to="/" />;
        if(this.state.switchToSignUp)
            redirect  = <Redirect to="/user/signup" />;  
        let formheading = <h3>SignIn Page</h3>;
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
                        <label >Email Id :</label> 
                        <input className="Input" 
                        type="email" 
                        placeholder="example@example.com" 
                        required 
                        onChange={(event) => this.inputChangeHandler('email', event)}
                        value={this.state.email}/>
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
                        <button className="success" >SignIn</button>
                        <button className="failure" onClick={this.cancelSignUpHandler}>Cancel</button>
                    </form>
                    <br />
                    <h4 style={{cursor: 'pointer'}} onClick={this.toggleHandler}>Click to Sign Up</h4>
                </div> 
            ); 
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


export default connect(mapStateToProps, mapDispatchToProps)(SignIn); 