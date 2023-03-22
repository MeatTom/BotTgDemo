import React from 'react';
import ButtonStyle from './button.module.css'

const Button = (props) => {
    return (
        <button {...props} className={ButtonStyle.button + ' ' + props.className}/>
    );
};

export default Button;