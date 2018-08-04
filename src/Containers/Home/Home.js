import React, { Component } from 'react';

import './Home.css';
import Category from '../../Components/Category/Category';
import Modal from '../../Components/Modal/Modal';
import axios from 'axios';

class Home extends Component{

    state = {
        category: null,
        subCategory: null,
        selectedCategory: null,
        showLabel: true,
        imageLink: null,
        imageId: null,
        showModal: false,
        categoryArr: null
    }

    componentDidMount(){
        axios.get('https://app-ncj.firebaseio.com/.json')
            .then( res => {
                // console.log(res.data);
                let categoryArr = [];
                for(let key in res.data){
                    categoryArr.push(key);
                }
                this.setState({ category: categoryArr});

                //Setting default Condition
                this.selectCategoryHandler(this.state.category[0]);
            })
            .catch(err => {
                console.log(err);
            });
    }

    selectCategoryHandler = (categoryName) => {
            
            axios.get('https://app-ncj.firebaseio.com/'+categoryName+'.json')
                .then( res => {
                    let subCategory = [];
                    for(let key in res.data){
                        let subCategoryName = key;
                        for(let keys in res.data[key]){
                            let subCategoryImg = res.data[key][keys]['link'];
                            subCategory.push({ [subCategoryName]: subCategoryImg})
                            break;
                        }
                    }
                    this.setState({
                        subCategory: subCategory,
                        selectedCategory: categoryName,
                        showLabel: true,
                        showModal: false
                    });
                })
                .catch( err => {
                    console.log('Error:' , err);
                });
    }

    subCategoryHandler = (subCategory, subCategoryLink) => {

        axios.get('https://app-ncj.firebaseio.com/'+this.state.selectedCategory+ '/'+ subCategory +'.json')
            .then( res => {
                let subCategoryImages = [];
                for(let key in res.data){
                    let subCategoryName = key;
                    let subCategoryImg = res.data[key]['link'];
                    subCategoryImages.push({ [subCategoryName]: subCategoryImg})
                }
                this.setState({
                    subCategory: subCategoryImages,
                    selectedCategory: subCategory,
                    showLabel: false,
                    showModal: false
                });
            })
            .catch( err => {
                console.log( 'Error :', err);
            });
    }

    openImageHandler = (imageId, imageLink) => {
        
        //Code to expand the image
        this.setState({
            showModal: true,
            imageId: imageId,
            imageLink: imageLink
        });
    }

    modalCancelHandler = () => {
        this.setState({
            showModal: false
        });
    }

    likeClickHandler = (category, imageId) => {
        //Check if user is logged In
        //Add an entry into the database with category, subcategory, imageid, imageLink, userid
        if(category === 'Necklace'){
            const updatedCategory = {...this.state[category]};
            const updatedSubCategory = {...updatedCategory[imageId]};
            updatedSubCategory.liked = !updatedSubCategory.liked;
            updatedCategory[imageId] = updatedSubCategory;
            this.setState({ 
                Necklace : updatedCategory
            });
        }
    }

    render(){

        //Creation of buttons based on category fetched from the database
        let buttonArray = [];
        if(this.state.category){
            for(let i=0; i< this.state.category.length; i++){
                buttonArray.push(<button key={i} onClick={() => this.selectCategoryHandler(this.state.category[i])}>{this.state.category[i]}</button>);      
            }
        }

        //Creation of subCategory based on the selected category and data fetched from the database
        let category = null;
        if(this.state.subCategory){
            category = (<Category 
                            subCategory={this.state.subCategory}
                            selectedCategory={this.state.selectedCategory} 
                            showLabel={this.state.showLabel}
                            subCategoryHandler={ this.state.category.includes(this.state.selectedCategory) ? this.subCategoryHandler : this.openImageHandler}
                        />  );
        }

        let modal = null;
        if(this.state.showModal){
            modal = <Modal imageLink={this.state.imageLink} imageId={this.state.imageId} modalCancel={this.modalCancelHandler}/>;
        }

        return (
            <div>
            {modal}
            <div>
                <div className="category">
                    {buttonArray}
                </div>  
                {category}
            </div>    
         </div>
        );
    }
}

export default Home;