import React from 'react';
import Button from "../Button/button";
import {useTelegram} from "../../hooks/telegram";
import HeaderStyle from './header.module.css'

const Header = () => {
    const {onClose} = useTelegram()

    return (
        <div className={HeaderStyle.header}>
            <Button className={HeaderStyle.button} onClick={onClose}>Закрыть</Button>
            <div className={HeaderStyle.title}>Каталог товаров</div>
        </div>
    );
};

export default Header;