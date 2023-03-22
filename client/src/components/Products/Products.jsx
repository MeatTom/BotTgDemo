import React, {useState} from 'react'
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/telegram";
import ProductsStyle from './Products.module.css'
import ModalProduct from "../ModalProduct/ModalProduct";
import axios from 'axios';
import Cart from '../Cart/Cart';

const Products = () => {
    const {telegram} = useTelegram()
    const [products, setProducts] = useState([]);
    const [addedItems, setAddedItems] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

   React.useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('https://641ac83ff398d7d95d5e5f08.mockapi.io/merabot/products');
            setProducts(response.data);
        };

        fetchProducts();
    }, []);

    const onAdd = (product) => {
        const addedInCart = addedItems.find(item => item.id === product.id)
        let newItems

        if(addedInCart) {
            newItems = addedItems.filter(item => item.id !== product.id)
        } else {
            newItems = [...addedItems, product]
        }

        setAddedItems(newItems)

        if(newItems.length === 0 && isCartOpen === false) {
            telegram.MainButton.hide()
        } else {
            telegram.MainButton.show()
            telegram.MainButton.setParams({text: 'Оформить заказ'})
            telegram.MainButton.onClick(openCart)
        }
    }

    const onCardClickHandler = (product) => {
        setSelectedProduct(product);
    }

    const closeModal = () => {
        setSelectedProduct(null);
    }

    const openCart = () => {
        setIsCartOpen(true);
        telegram.MainButton.hide()
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    return (
        <div className={ProductsStyle.list}>
            {products.map(item => (
                <ProductItem key={item.id} id={item.id} product={item} onAdd={onAdd} onCardClick={onCardClickHandler} className={ProductsStyle.item} addedItems={addedItems}/>
            ))}
            {selectedProduct && <ModalProduct product={selectedProduct} onClose={closeModal} />}
            {isCartOpen && <Cart addedItems={addedItems} onClose={closeCart}/>}
        </div>
    );
};

export default Products;