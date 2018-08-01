import React from 'react';

import './Category.css';
import CategoryItem from './Category-Item/CategoryItem';
import Modal from '../Modal/Modal';

const category = (props) => {
    
    const categoryList = Object.keys(props.selectedCategoryList).map(items => {
        return <CategoryItem 
        key={items} 
        add={props.selectedCategoryList[items]} 
        subCategoryHandler={props.subCategory} 
        categoryName={items}
        showLabel={props.showLabel}
        ></CategoryItem>
    });
    return(
        <div className="Category">
            {categoryList}
        </div>
    );
}

export default category;