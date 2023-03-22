import React, { useState } from 'react';
import axios from 'axios';
import Button from "../Button/button";
import CartStyle from "../Cart/Cart.module.css"
import {useTelegram} from "../../hooks/telegram";
import InputMask from 'react-input-mask';

const Cart = ({ addedItems, onClose, openCart }) => {
    const {telegram} = useTelegram()
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isOrderSuccess, setIsOrderSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const orderData = {
                name: name,
                phone: phone,
                items: addedItems.map((item) => item.id),
            };

            const response = await axios.post('https://641ac83ff398d7d95d5e5f08.mockapi.io/merabot/orders', orderData);
            console.log(response.data);
            setIsOrderSuccess(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseCart = () => {
        telegram.MainButton.show();
        telegram.MainButton.setParams({text: 'Оформить заказ'});
        telegram.MainButton.onClick(openCart);
        onClose();
    };

    return (
        <div className={CartStyle.cart_modal}>
            {isOrderSuccess ? (
                <div className={CartStyle.cart_success}>
                    <div className={CartStyle.cart_success_content}>
                    <p>Ваш заказ успешно оформлен! Ожидайте звонка в ближайшее время</p>
                    <Button onClick={() => telegram.close()}>Закрыть каталог</Button>
                    </div>
                </div>
            ) : (
                <div className={CartStyle.cart_modal_content}>
          <span className={CartStyle.close} onClick={handleCloseCart}>
            &times;
          </span>
                    <h1>Корзина</h1>
                    {addedItems.length === 0 && <p>Корзина пуста</p>}
                    {addedItems.length > 0 && (
                        <>
                            <div className={CartStyle.cart_products}>
                                <h2>Заказанные товары:</h2>
                                <ul>
                                    {addedItems.map((item) => (
                                        <li key={item.id}>{item.title}</li>
                                    ))}
                                </ul>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <p>Для заказа товара заполните форму</p>
                                <label className={CartStyle.cart_form_fio}>
                                    ФИО:
                                    <input
                                        placeholder={'Фамилия Имя Отчество'}
                                        type="text"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        required
                                    />
                                </label>
                                <label className={CartStyle.cart_form_phone}>
                                    Номер телефона:
                                    <InputMask
                                        mask="+79999999999"
                                        type="tel"
                                        placeholder={'+7__________'}
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                        required
                                    />
                                </label>
                                <Button className={CartStyle.cart_btn} type="submit">Отправить</Button>
                            </form>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};


export default Cart;