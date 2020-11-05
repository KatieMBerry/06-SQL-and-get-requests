import React from 'react';
import request from 'superagent';


export default class CocktailPage extends React.Component {
    state = {
        cocktails: [],
        loading: false,
    }

    componentDidMount = async () => {
        await this.fetchCocktail();
    }

    fetchCocktail = async () => {
        this.setState({ loading: true })
        const response = await request.get(`https://pacific-garden-61897.herokuapp.com/cocktails`);

        this.setState({
            cocktails: response.body,
            loading: false,
        });
    }

    render() {
        console.log(this.state.cocktails);
        return (<>
            <div className="fetch">
                <div className="cocktail-fetch">
                    {
                        this.state.loading
                            ? <iframe
                                src="https://giphy.com/embed/xTk9ZvMnbIiIew7IpW"
                                title={Math.random()}
                                width="480"
                                height="480"
                                frameBorder="0"
                                className="giphy-embed"
                                allowFullScreen />
                            : this.state.cocktails.map(cocktail =>
                                <div key={cocktail.name} >
                                    <div className="poke-card">
                                        <h2> {cocktail.name}</h2>
                                        {/* <img src={cocktail.img} alt={cocktail.name} width="100" height="100" /> */}
                                        <div>Strength: {cocktail.strength}</div>
                                        <div>Alcohol Type: {cocktail.alcohol_type}</div>
                                        <div>Hot Drink: {cocktail.hot_drink.toString()}</div></div>
                                </div>)
                    }
                </div>
            </div></>
        )
    }
}
