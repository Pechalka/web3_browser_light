import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../redux/appMenu'

const styles = require('./AddToAppMenuButton.css');

class AddToAppMenuButton extends Component {

    showInput = () => {
        this.props.showInput();
    };

    render() {

        const pendingAddToFavorites = this.props.pendingAddToFavorites;

        return (
            <span>
                {!pendingAddToFavorites &&
                    <button onClick={this.showInput} className='addAppButton'>
                        &#9734;
                    </button>
                }
            </span>
        )
    }
}

export const Container = ({children}) => (
    <div className='favoritesContainer'>
        {children}
    </div>
)

export default connect(
    state => ({
        menuItems: state.appMenu.items,
        currentDura: state.browser.dura,
        pendingAddToFavorites: state.appMenu.pendingAddToFavorites,
    }),
    actions
)(AddToAppMenuButton);
