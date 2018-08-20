import React, { Component } from 'react';

import './Layout.css';
import Navigation from '../../Components/Navigation/Navigation';
import Footer from '../../Components/Footer/Footer';

class Layout extends Component{
    render(){
       
        return (
            <div className="Layout">
                <Navigation />
                {/* Router */}
                {this.props.children}
                <Footer />
            </div>    
        );
    }
}

export default Layout;