import React from 'react';

import './CategoryItem.css';

const categoryItem = (props) => {
    let label = null;
    if(props.showLabel){
        label = <h2 onClick={() => props.subCategoryHandler(props.categoryName)}>{props.categoryName}</h2>;
    }
    return(
        <div className="CategoryItem">
            <img 
            alt="Gold"
            src={props.add}
            onClick={() => props.subCategoryHandler(props.categoryName, props.add)}/>
            {label}
        </div>    
       
    );
}

export default categoryItem;