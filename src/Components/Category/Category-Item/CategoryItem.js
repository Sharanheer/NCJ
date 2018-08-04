import React from 'react';

import './CategoryItem.css';
import Ionicon from 'react-ionicons';

const categoryItem = (props) => {

    
    let label = null;
    if(props.showLabel){
        label = <h2 onClick={() => props.subCategoryHandler(props.categoryName, props.add)}>{props.categoryName}</h2>;
    }
    let icon = null;
    // if(!props.showLabel){
    //     icon = <Ionicon className="heart" icon="md-heart-outline" fontSize="35px" onClick={() => props.likeClicked(props.selectedCategory, props.categoryName)} color="red"/>;
    //     if(props.liked)
    //         icon = <Ionicon className="heart" icon="md-heart" fontSize="35px" onClick={() => props.likeClicked(props.selectedCategory, props.categoryName)} color="red"/>;
    // }
    return(
        <div className="CategoryItem">
            <img 
            alt="Gold"
            src={props.add}
            onClick={() => props.subCategoryHandler(props.categoryName, props.add)}/>
            {label}
            {/* {icon} */}
        </div>    
    );
}

export default categoryItem;