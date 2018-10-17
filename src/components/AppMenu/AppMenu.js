import React, {Component} from 'react';
import {connect} from "react-redux";
import CybLink from "../CybLink";
import * as actions from "../../redux/appMenu"

const styles = require("./AppMenu.css");

class AppMenu extends Component {

    addToFavorites = () => {
        const dura = this.props.currentDura;
        const name = this.refs.input.value;

        this.props.addMenuItem(name, dura);
        this.hideInput();
    };

    hideInput = () => {
        this.props.hideInput();
    };

    render() {
        const deleteAppFromMenu = (rootDura) => {
            this.props.deleteMenuItem(rootDura);
        }

        const appMenuItems = this.props.menuItems.map(item => {
            return <span className='AppMenuItem' key={item.rootDura}>
                <CybLink dura={item.rootDura}>
                    <AppMenuItem name={item.name}/>
                </CybLink>
                <button className='removeButton' onClick={() => deleteAppFromMenu(item.rootDura)}>&#128465;</button>
            </span>
        });

        const pendingAddToFavorites = this.props.pendingAddToFavorites;

        return (
            <div className='menuContainer'>
                <div className='appMenu'>
                    {appMenuItems}
                </div>
                {pendingAddToFavorites &&
                    <span>
                        <input
                            ref='input'
                            defaultValue='New App'
                        />
                        <button onClick={this.addToFavorites} className={styles.addAppButton}>
                            &#128077;
                        </button>
                    </span>
                }
            </div>
        );
    }
}

class AppMenuItem extends Component {

    render() {
        return (
            <div className='AppMenuItem'>
                {this.props.name}
            </div>
        )
    }
}


export default connect(
    state => ({
        menuItems: state.appMenu.items,
        currentDura: state.browser.dura,
        pendingAddToFavorites: state.appMenu.pendingAddToFavorites
    }),
    actions
)(AppMenu);