import React, { Component } from 'react';

import './Layout.css';
import Navigation from '../../Components/Navigation/Navigation';
import Home from '../Home/Home';

class Layout extends Component{
    render(){
        return (
            <div className="Layout">
                <Navigation />
                {/* Router */}
                <Home />
                
            </div>    
        );
    }
}

export default Layout;