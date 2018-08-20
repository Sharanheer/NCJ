import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Navigation.css';
import NavigationItem from './NavigationItem/NavigationItem';

class Navigation extends Component{
    
    render(){

        let nav = (
            <div className="dropdown-content">
            <NavigationItem Link="/user/signin">SignIn</NavigationItem>
            <NavigationItem Link="/user/signup">SignUp</NavigationItem>
            </div>
        );
        console.log('props.token :', this.props.token);
        if(this.props.token){
            const myFavLink = `/${this.props.username}/myfav`;
            const logoutLink = `/${this.props.username}/logout`;
            nav = (<div className="dropdown-content">
                <NavigationItem Link={myFavLink}>MyFav</NavigationItem>
                <NavigationItem Link={logoutLink}>Logout</NavigationItem>
            </div>
            );
        }
        let users = 'User Info';
        let Link = "/user";
        if(this.props.token){
            users = this.props.username;
            Link = `/${users}`;
        }
        return (
            <nav className="Navigation">
                <ul>
                    <NavigationItem Link="/" exact="true">Home </NavigationItem>
                    <NavigationItem Link="/about" exact="true">About</NavigationItem>
                </ul> 
                
                <li style={{ margin: 'auto' ,listStyleType: 'none', color: 'gold', display: 'block'}}>NCJ</li>
                <div className="dropdown">
                    {/* <button className="dropbtn">{ this.props.token ? this.props.username : 'Users'}</button> */}
                    <NavigationItem Link={Link}>{ users }</NavigationItem>
                    {nav}
                </div> 
                <NavigationItem Link="/contact" exact="true">Contact</NavigationItem>  
                
            </nav>      
        );
    }
    
} 

const mapStateToProps = state => {
    return {
        token: state.tokenId,
        username: state.username
    }
}

export default withRouter(connect(mapStateToProps)(Navigation));