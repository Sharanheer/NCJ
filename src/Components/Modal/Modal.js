import React from 'react';

import './Modal.css';

const modal = (props) => {
    return (
        <div>
        <div className="Transparent"></div>
        <button className="button" onClick={props.modalCancel}>X</button>
        <div className="Modal">
            <img src={props.imageLink} alt={props.imageId} />
            
        </div>
        </div>
    );
}

export default modal;
