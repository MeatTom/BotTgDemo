import React from 'react';
import ModalStyle from './ModalProduct.module.css';
import axios from "axios";

const ModalProduct = ({ product, onClose, showModal }) => {

    const [productInfo, setProductInfo] = React.useState(null);
    const productId = product.id
    React.useEffect(() => {
        const getProductInfo = async () => {
            try {
                const response = await axios.get(`https://641ac83ff398d7d95d5e5f08.mockapi.io/merabot/products`);
                const product = response.data.find(p => p.id === productId);
                setProductInfo(product);
            } catch (error) {
                console.log(error);
            }
        };
        getProductInfo();
    }, [productId]);

    return (
        <div className={ModalStyle.modal}>
            <div className={ModalStyle.modal_content}>
        <span className={ModalStyle.close} onClick={onClose}>
          &times;
        </span>
                {productInfo ? (
                    <>
                <h2>{productInfo.title}</h2>
                <img src={productInfo.img} alt={productInfo.title} />
                        <ul className={ModalStyle.desc}>
                            {productInfo.desc_full.split(';').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
            </>
            ) : (
            <p className={ModalStyle.loading}>Loading...</p>
            )}
            </div>
        </div>
    );
};

export default ModalProduct;