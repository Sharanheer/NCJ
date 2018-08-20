import React, { Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './MyFav.css';
import Category from '../../Components/Category/Category';
import Modal from '../../Components/Modal/Modal';

class MyFav extends Component{

    state = {
        subCategory: [],
        showModal: false,
        imageId: null,
        imageLink: null
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
        
        //Also update the local subcategory array
        let updatedSubCategory = this.state.subCategory.map(obj => {
            for(let key in obj){
                if(key === imageId){
                    break;
                }
                else{
                    return Object.assign({}, obj);
                }
            }
            return null;
        });
        this.setState({ subCategory: updatedSubCategory});
    }

    componentDidMount(){
        axios.get('https://app-ncj.firebaseio.com/myfav.json?auth='+ this.props.tokenId)
            .then( res => {
                let myFavImages = [];
                for( let key in res.data){
                    if(res.data[key].userId === this.props.userId){
                        console.log('Link :',res.data[key].imageLink);
                        myFavImages.push({ [res.data[key].imageId]: res.data[key].imageLink ,heart: true});
                    }
                }
                this.setState({
                    subCategory: myFavImages
                });    
            })
            .catch( err => {
                console.log('Error :', err);
            });
    }

    render(){
        //Modal
        let modal = null;
        if(this.state.showModal){
            modal = <Modal imageLink={this.state.imageLink} imageId={this.state.imageId} modalCancel={this.modalCancelHandler}/>;
        }

        //To display a message when no fav image is present
        let empty = 0;
        for(let i=0; i< this.state.subCategory.length; i++){
            if(this.state.subCategory[i] !== null){
                empty += 1;
            }
        }
        let category = <h2> Oops....! You don't have any favorite item. Please click on the heart button to like an image in the Home tab.</h2>;
        if(this.state.subCategory.length > 0 && empty > 0){
            category = (<Category 
                            subCategory={this.state.subCategory}
                            selectedCategory={null} 
                            showLabel={null}
                            subCategoryHandler={this.openImageHandler}
                            likeClickHandler={this.likeClickHandler}
                        />  );
        } 

        return (
            <div>
                {modal}
                <div>
                    <div className="htab">
                        <h1>All your favorite items in one place</h1>
                    </div>
                    <div className="MyFav">
                        {category}            
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        tokenId: state.tokenId,
        username: state.username
    }
}

export default connect(mapStateToProps)(MyFav);