import React from 'react';

import './Navigation.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigation = () => {
    return (
        <nav className="Navigation">
            <ul>
                <NavigationItem Link="/">Home </NavigationItem>
                <NavigationItem Link="/about">About</NavigationItem>
            </ul> 
            
            <li style={{ margin: 'auto' ,listStyleType: 'none', color: 'gold', display: 'block'}}>NCJ</li>
            <NavigationItem Link="/users">Users</NavigationItem>
            <NavigationItem Link="/contact">Contact</NavigationItem>  
            
        </nav>    
    );
}

export default navigation;