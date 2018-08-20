import React, { Component } from 'react';

import './Home.css';
import Category from '../../Components/Category/Category';
import Modal from '../../Components/Modal/Modal';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Home extends Component{

    state = {
        category: null,
        subCategory: null,
        previousCategory: null,
        selectedCategory: null,
        showLabel: true,
        showModal: false,
        imageLink: null,
        imageId: null,
        allowedToLike: true,
        spinner: false
    }

    componentDidMount(){
        //Initially we assume user is logged in. Later while clicking on like button we will check if its authorized to do so
        // this.setState({allowedToLike: true});
        this.setState({ spinner: true });

        axios.get('https://app-ncj.firebaseio.com/home.json')
            .then( res => {
                // console.log(res.data);

                let categoryArr = [];
                for(let key in res.data){
                    categoryArr.push(key);
                }
                this.setState({ 
                    category: categoryArr,
                    previousCategory: null,
                    spinner: false
                });

                //Setting default Condition
                this.selectCategoryHandler(this.state.category[0]);
            })
            .catch(err => {
                console.log(err);
                this.setState({ spinner: false });
            });
    }

    selectCategoryHandler = (categoryName) => {
        this.setState({ spinner: true });
        axios.get('https://app-ncj.firebaseio.com/home/'+categoryName+'.json')
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
                let previousCategory = this.state.selectedCategory;
                this.setState({
                    spinner: false,
                    subCategory: subCategory,
                    selectedCategory: categoryName,
                    previousCategory: previousCategory,
                    showLabel: true,
                    showModal: false
                });
            })
            .catch( err => {
                console.log('Error:' , err);
                this.setState({ spinner: false });
            });
    }

    // subCategoryHandler = (subCategory, subCategoryLink) => {

        
    //     //Fetch my fav
    //     let fav = null;
    //     axios.get('https://app-ncj.firebaseio.com/myfav.json?auth='+ this.props.tokenId)
    //         .then( res => {
    //             fav = res.data;
                
    //             //Fetch original images and updated based on my fav
    //             axios.get('https://app-ncj.firebaseio.com/home/'+this.state.selectedCategory+ '/'+ subCategory +'.json')
    //                 .then( res => {
    //                     let subCategoryImages = [];
    //                     for(let key in res.data){
    //                         let subCategoryName = key;
    //                         let subCategoryImg = res.data[key]['link'];
    //                         // let heart = res.data[key]['heart'];
    //                         // console.log('heart :', heart);
    //                         let found = false;
    //                         //if fav is present and token is present or user is logged in
    //                         if(fav && this.props.tokenId){
    //                             for(let item in fav){
    //                                 //fetch only the fav images for the current user
    //                                 if(fav[item].imageId === key && fav[item].userId === this.props.userId){
    //                                     subCategoryImages.push({ [subCategoryName]: subCategoryImg, 'heart' : true });
    //                                     found = true;
    //                                     break;
    //                                 }
    //                             }
                               
    //                             if(!found)
    //                                 subCategoryImages.push({ [subCategoryName]: subCategoryImg, 'heart' : false })
    //                         }
    //                         else{
    //                             subCategoryImages.push({ [subCategoryName]: subCategoryImg, 'heart' : false })
    //                         } 
    //                     }
    //                     let previousCategory = this.state.selectedCategory;
    //                     this.setState({
    //                         subCategory: subCategoryImages,
    //                         selectedCategory: subCategory,
    //                         previousCategory: previousCategory,
    //                         showLabel: false,
    //                         showModal: false
    //                     });

    //                 })
    //                 .catch( err => {
    //                     console.log( 'Error :', err);
    //                 });
    //         })
    //         .catch( err => {
    //             console.log('error: ', err);
    //         });
    // }

    subCategoryHandler = (subCategory, subCategoryLink) => {

        this.setState({ spinner: true });

        if(this.props.tokenId){
        //Fetch my fav
        let fav = null;
        axios.get('https://app-ncj.firebaseio.com/myfav.json?auth='+ this.props.tokenId)
            .then( res => {
                fav = res.data;
                
                //Fetch original images and updated based on my fav
                axios.get('https://app-ncj.firebaseio.com/home/'+this.state.selectedCategory+ '/'+ subCategory +'.json')
                    .then( res => {
                        let subCategoryImages = [];
                        for(let key in res.data){
                            let subCategoryName = key;
                            let subCategoryImg = res.data[key]['link'];
        
                            let found = false;
                            for(let item in fav){
                                //fetch only the fav images for the current user
                                if(fav[item].imageId === key && fav[item].userId === this.props.userId){
                                    subCategoryImages.push({ [subCategoryName]: subCategoryImg, 'heart' : true });
                                    found = true;
                                    break;
                                }
                            }
                            
                            if(!found)
                                subCategoryImages.push({ [subCategoryName]: subCategoryImg, 'heart' : false })
                        }
                        let previousCategory = this.state.selectedCategory;
                        this.setState({
                            subCategory: subCategoryImages,
                            selectedCategory: subCategory,
                            previousCategory: previousCategory,
                            showLabel: false,
                            showModal: false,
                            spinner: false
                        });
                    })
                    .catch( err => {
                        console.log( 'Error :', err);
                        this.setState({ spinner: false });
                    });
            })
            .catch( err => {
                console.log('error: ', err);
                this.setState({ spinner: false });
            });
        }
        else {
            axios.get('https://app-ncj.firebaseio.com/home/'+this.state.selectedCategory+ '/'+ subCategory +'.json')
                .then( res => {
                    let subCategoryImages = [];
                    for(let key in res.data){
                        let subCategoryName = key;
                        let subCategoryImg = res.data[key]['link'];
                        subCategoryImages.push({ [subCategoryName]: subCategoryImg, 'heart' : false })
                    }
                    let previousCategory = this.state.selectedCategory;
                    this.setState({
                        subCategory: subCategoryImages,
                        selectedCategory: subCategory,
                        previousCategory: previousCategory,
                        showLabel: false,
                        showModal: false,
                        spinner: false
                    });
                })
                .catch( err => {
                    console.log('Error :', err);
                    this.setState({ spinner: false });
                });  
        }      
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

    likeClickHandler = (imageId, imageLink, liked) => {
        //Check if user is logged In
        
        if(this.props.tokenId === null){
            this.setState({
                allowedToLike:false
            })
        }
        else{
            
            if(liked){
                //Store into the database
                let data = {
                    category: this.state.previousCategory, 
                    subcategory: this.state.selectedCategory, 
                    imageLink: imageLink,
                    imageId: imageId,
                    userId: this.props.userId
                };
                //Add an entry into the database with this.state.category, this.state.subcategory, imageid, optional: {imageLink}, userid
                axios.post('https://app-ncj.firebaseio.com/myfav.json?auth='+ this.props.tokenId, data)
                    .then( res => {
                        console.log('Image added as Fav...', res);
                    })
                    .catch( err => {
                        console.log('Error: ', err);
                    });
            }
            else{
                //Remove from the database
                axios.get('https://app-ncj.firebaseio.com/myfav.json?auth='+ this.props.tokenId)
                    .then( res => {
                        console.log('Res data: ', res.data);
                        for( let key in res.data){
                            if(res.data[key].imageId === imageId && res.data[key].userId === this.props.userId){
                                axios.delete('https://app-ncj.firebaseio.com/myfav/'+ key +'.json?auth='+ this.props.tokenId)
                                    .then( res => {
                                        console.log('Image deleted: ', res);
                                    })
                                    .catch( err => {
                                        console.log('Error :', err);
                                    });
                                return;    
                            }
                        }
                    })
                    .catch( err => {
                        console.log('Error :', err);
                    });
            }
            
            //Also update the local subcategory array
            let updatedSubCategory = this.state.subCategory.map(obj => {
                for(let key in obj){
                    if(key === imageId){
                        return Object.assign({}, obj, { heart: !obj['heart'] });
                    }
                    else{
                        return Object.assign({}, obj);
                    }
                }
                return null;
            });
            this.setState({ subCategory: updatedSubCategory});
        }
    }

    render(){

        //Creation of buttons based on category fetched from the database
        let buttonArray = <Spinner />;
        if(this.state.category && !this.state.spinner){
            buttonArray = [];
            for(let i=0; i< this.state.category.length; i++){
                buttonArray.push(<button key={i} onClick={() => this.selectCategoryHandler(this.state.category[i])}>{this.state.category[i]}</button>);      
            }
        }

        //Creation of subCategory based on the selected category and data fetched from the database
        let category = <Spinner />;
        if(this.state.subCategory && !this.state.spinner){
            category = (<Category 
                            subCategory={this.state.subCategory}
                            selectedCategory={this.state.selectedCategory} 
                            showLabel={this.state.showLabel}
                            subCategoryHandler={ this.state.category.includes(this.state.selectedCategory) ? this.subCategoryHandler : this.openImageHandler}
                            likeClickHandler={this.likeClickHandler}
                        />  );
        }

        let modal = null;
        if(this.state.showModal){
            modal = <Modal imageLink={this.state.imageLink} imageId={this.state.imageId} modalCancel={this.modalCancelHandler}/>;
        }

        return (
            <div>
                { this.state.allowedToLike ? null : <Redirect to="/user/signin" />}
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

const mapStateToProps = state => {
    return {
        userId: state.userId,
        tokenId: state.tokenId
    }
}

export default connect(mapStateToProps)(Home);