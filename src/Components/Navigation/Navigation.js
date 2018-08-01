import React from 'react';

import './Navigation.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigation = () => {
    return (
        <nav className="Navigation">
            <ul>
                <NavigationItem >Home </NavigationItem>
                <NavigationItem >About</NavigationItem>
            </ul> 
            
            <li style={{ margin: 'auto' ,listStyleType: 'none', color: 'gold', display: 'block'}}>NCJ</li>
            <NavigationItem >Users</NavigationItem>
            <NavigationItem >Contact</NavigationItem>  
            
        </nav>    
    );
}

export default navigation;