import React from 'react';

import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <li className="NavigationItem">
            <NavLink to={props.Link} exact className="inactive" activeClassName="active">
            {props.children}
            </NavLink>
        </li>   
    );
}

export default navigationItem;