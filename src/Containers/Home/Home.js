import React, { Component } from 'react';

import './Home.css';
import Category from '../../Components/Category/Category';
import Footer from '../../Components/Footer/Footer';
import Modal from '../../Components/Modal/Modal';

class Home extends Component{

    state = {
        gold : {
            'Necklace': 'http://stat.homeshop18.com/homeshop18/images/productImages/744/kundan-necklace-set-by-sia-jewellery-nset-004-large_7d9c8daad6a5c33484e9d0517d97c6d6.jpg', 
            'Ring': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF_ET7A8yomKZLEk2HibF5RgRjte0-onh2d1yNF9d9xen6lA_mdQ',
            'Bangle': 'https://i.pinimg.com/originals/28/79/85/287985b8816a0b11600a64863751ce46.jpg',
            'Chain': 'https://cdn.shopify.com/s/files/1/1716/4103/products/product-image-206765356_480x480.jpg?v=1522191152',
            'Earring': 'https://images-na.ssl-images-amazon.com/images/I/41xGGMNCY9L.jpg',
            'Braclet': 'https://www.pagoda.com/productimages/processed/V-19988177_0_565.jpg',
            'BajuBund': 'https://images-cdn.azureedge.net/azure/in-resources/d7048855-742a-406c-a67d-5c2962e69e5e/Images/ProductImages/Source/BJB410199_1.jpg;width=1000;height=1000;scale=canvas;anchor=bottomcenter',
            'Mangalsutra': 'https://www.papilior.com/assets/product_images/340x340/8/indrani-gold-mangalsutra.jpg'
        },
        silver: {},
        diamond: {},
        necklace: {
            '1': 'https://3.imimg.com/data3/VG/XU/MY-9544961/gold-nacklace-set-500x500.png', 
            '2': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF_ET7A8yomKZLEk2HibF5RgRjte0-onh2d1yNF9d9xen6lA_mdQ',
            '3': 'https://i.pinimg.com/originals/28/79/85/287985b8816a0b11600a64863751ce46.jpg',
            '4': 'https://cdn.shopify.com/s/files/1/1716/4103/products/product-image-206765356_480x480.jpg?v=1522191152',
            '5': 'https://images-na.ssl-images-amazon.com/images/I/41xGGMNCY9L.jpg',
            '6': 'https://www.pagoda.com/productimages/processed/V-19988177_0_565.jpg',
            '7': 'https://images-cdn.azureedge.net/azure/in-resources/d7048855-742a-406c-a67d-5c2962e69e5e/Images/ProductImages/Source/BJB410199_1.jpg;width=1000;height=1000;scale=canvas;anchor=bottomcenter',
            '8': 'https://www.papilior.com/assets/product_images/340x340/8/indrani-gold-mangalsutra.jpg'
        },
        selectedCategory: 'gold',
        showLabel: true,
        imageLink: null,
        imageId: null,
        showModal: false
    }

    selectCategoryHandler = (selectorId) => {
        this.setState({
            selectedCategory: selectorId,
            showLabel: true,
            showModal: false
        })
    }

    subCategoryHandler = (subCategoryId, subCategoryLink) => {
        this.setState({
            selectedCategory: subCategoryId,
            showLabel: false,
            showModal: false
        })
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

    render(){

        let modal = null;
        if(this.state.showModal){
            modal = <Modal imageLink={this.state.imageLink} imageId={this.state.imageId} modalCancel={this.modalCancelHandler}/>;
        }

        let selectedCategoryList = this.state.gold;
        if(this.state.selectedCategory === 'silver')
            selectedCategoryList = this.state.silver;
        else if(this.state.selectedCategory === 'diamond')
            selectedCategoryList = this.state.diamond;
        else if(this.state.selectedCategory === 'Necklace')
            selectedCategoryList = this.state.necklace;
        return (
            <div>
            {modal}
            <div>
                {/* Buttons Gold, Silver, Diamond
                Icons for displaying different categories */}
                <div className="category">
                    <button onClick={() => this.selectCategoryHandler('gold')}>GOLD</button>
                    <button onClick={() => this.selectCategoryHandler('silver')}>SILVER</button>
                    <button onClick={() => this.selectCategoryHandler('diamond')}>DIAMOND</button>
                </div>  
                <Category 
                    selectedCategory={this.state.selectedCategory} 
                    selectedCategoryList={selectedCategoryList}
                    showLabel={this.state.showLabel}
                    subCategory={ (this.state.selectedCategory === 'gold' | 
                    this.state.selectedCategory === 'silver' | 
                    this.state.selectedCategory === 'diamond') ? this.subCategoryHandler : this.openImageHandler}/>  
                <Footer />
            </div>    
         </div>
        );
    }
}

export default Home;