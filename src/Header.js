import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                Welcome to Cocktail Counter!
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/cocktails">CocktailPage</Link>
                    </li>
                    <li>
                        <Link to="/create">Create a Cocktail</Link>
                    </li>
                </ul>
            </div>
        )
    }
}