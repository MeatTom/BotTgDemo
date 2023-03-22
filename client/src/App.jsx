import React from 'react';
import {useEffect} from "react";
import AppStyle from './App.module.css';
import Header from "./components/Header/header";
import {useTelegram} from "./hooks/telegram";
import Products from "./components/Products/Products";


function App() {
    const {telegram} = useTelegram()

    useEffect(() => {
        telegram.ready()
    },[telegram])

  return (
      <body className={AppStyle.Main_Page}>
    <div>
        <Header/>
        <Products/>
    </div>
      </body>
  );
}

export default App;
