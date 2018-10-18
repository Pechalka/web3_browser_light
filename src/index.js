import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import {store, appStart} from './redux/store';
import AppRouter from "./router";

ReactDOM.render(
    <Provider store={store}>
        <AppRouter/>
    </Provider>
    , document.getElementById('root'));

appStart(store);


