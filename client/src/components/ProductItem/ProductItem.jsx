import React from 'react';
import Button from "../Button/button";
import ProductItemStyle from './ProductItem.module.css'

const ProductItem = ({product, onAdd, onCardClick, addedItems}) => {
    const onAddHandler = () => {
        onAdd(product)
    }

    const onCardClickHandler = () => {
        onCardClick(product)
    }

    const isAdded = addedItems.some(item => item.id === product.id);

    return (
        <div className={ProductItemStyle.product}>
            <div onClick={onCardClickHandler}>
            <div className={ProductItemStyle.category}>{product.category}</div>
            <div className={ProductItemStyle.item}>
                <img src = {product.img} alt={product.title}/>
            </div>
            <div className={ProductItemStyle.title}>{product.title}</div>
            <div className={ProductItemStyle.description}>{product.description}</div>
            </div>
            <Button className={isAdded ? `${ProductItemStyle.add_button} ${ProductItemStyle.added_btn}` : ProductItemStyle.add_button} onClick={onAddHandler}>
                {isAdded ? "В корзине" : "Заказать"}
            </Button>
        </div>
    );
};

export default ProductItem;