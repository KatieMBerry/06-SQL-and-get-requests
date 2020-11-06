import React from 'react';
import { fetchCocktails } from './fetches.js';
import { Link } from 'react-router-dom';

export default class CocktailPage extends React.Component {
    state = {
        cocktails: [],
        loading: false
    }

    componentDidMount = async () => {
        const cocktails = await fetchCocktails();

        this.setState({
            cocktails,
            loading: true
        });
    }

    render() {
        const { cocktails } = this.state
        return (<>
            <div className="fetch">
                <div className="cocktail-fetch">
                    {
                        cocktails.loading
                            ? <iframe
                                src="https://giphy.com/embed/xTk9ZvMnbIiIew7IpW"
                                title={Math.random()}
                                width="480"
                                height="480"
                                frameBorder="0"
                                className="giphy-embed"
                                allowFullScreen />
                            : cocktails.map(cocktail =>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/update/${cocktails.name}`}>
                                    <div key={cocktail.name} >
                                        <div className="cocktail-card">
                                            <h2>{cocktail.name}</h2>
                                            {/* <img src={cocktail.img} alt={cocktail.name} width="100" height="100" /> */}
                                            <div key={cocktail.strength}>Strength: {cocktail.strength}</div>
                                            <div key={cocktail.type}>Alcohol Type: {cocktail.type}</div>
                                            <div key={cocktail.hot_drink}>Hot Drink: {cocktail.hot_drink.toString()}</div>
                                        </div>
                                    </div>
                                </Link>)
                    }
                </div>
            </div></>
        )
    }
}
