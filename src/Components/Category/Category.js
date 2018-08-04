import React from 'react';

import './Category.css';
import CategoryItem from './Category-Item/CategoryItem';

const category = (props) => {
    
    // const categoryList = Object.keys(props.selectedCategoryList).map(items => {
    //     return <CategoryItem 
    //     key={items} 
    //     add={props.selectedCategoryList[items]['link']} 
    //     selectedCategory={props.selectedCategory}
    //     subCategoryHandler={props.subCategory} 
    //     categoryName={items}
    //     showLabel={props.showLabel}
    //     liked={props.selectedCategoryList[items]['liked']} 
    //     likeClicked={props.likeClicked}
    //     ></CategoryItem>
    // });
    let categoryList = [];
    for(let i=0; i < props.subCategory.length; i++){
        for(let keys in props.subCategory[i]){
            categoryList.push(<CategoryItem 
            key={keys} 
            add={props.subCategory[i][keys]} 
            selectedCategory={props.selectedCategory}
            subCategoryHandler={props.subCategoryHandler} 
            categoryName={keys}
            showLabel={props.showLabel}
            />);
        }
    }
    
    return(
        <div className="Category">
            {categoryList}
        </div>
    );
}

export default category;