import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Layout from './Containers/Layout/Layout';
import Home from './Containers/Home/Home';
import About from './Components/About/About';
import MyFav from './Containers/MyFav/MyFav';
import Contact from './Components/Contact/Contact';
import SignUp from './Containers/Auth/SignUp/SignUp';
import SignIn from './Containers/Auth/SignIn/SignIn';
import Logout from './Components/Logout/logout';
import { setExpiration } from './Store/Action/action';


class App extends Component {

  componentWillMount(){
    const tokenId = localStorage.getItem('tokenId');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    console.log(expirationDate);
    if(expirationDate > new Date()){
      this.props.storeAuth( username, tokenId, userId);
      const timeInSecs = (expirationDate.getTime() - new Date().getTime())/1000;
      console.log(timeInSecs);
      this.props.onStartUp(timeInSecs);
    }
    else{
      this.props.storeAuth( null, null, null);
    }
    
  }

  render() {
    const username = `/${this.props.username}`;
    const myFav = `/${this.props.username}/myfav`;
    const logout = `/${this.props.username}/logout`
    const routes = (
      <Switch>
        <Route path={username} exact component={MyFav} />
        <Route path="/about" exact component={About} />
        <Route path={myFav} exact component={MyFav} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/user" exact component={SignIn} />
        <Route path="/user/signup" exact component={SignUp} />
        <Route path="/user/signin" exact component={SignIn} />
        <Route path={logout} exact component={Logout} />
        <Route path="/" exact component={Home} />
      </Switch>
    );
 
    return (
      <div className="App">
        <Layout>
           {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username : state.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeAuth: (username, tokenId, userId) => dispatch({type: 'AUTH_STORE', username: username, tokenId: tokenId, userId: userId}),
    onStartUp: (expirationTime) => dispatch(setExpiration(expirationTime))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
