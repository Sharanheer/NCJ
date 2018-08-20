import React from 'react';

import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <li className="NavigationItem">
            <NavLink to={props.Link} exact={props.exact} className="inactive" activeClassName="activeLink">
            {/* <NavLink to={props.Link} exact activeClassName="activeLink"> */}
            {props.children}
            </NavLink>
        </li>   
    );
}
 
export default navigationItem; 