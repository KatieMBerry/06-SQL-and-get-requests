import React from 'react';
import request from 'superagent';


export default class CocktailPage extends React.Component {
    state = {
        cocktails: [],
        loading: false,
        name: 'gin_and_juicey'
    }

    componentDidMount = async () => {
        await this.fetchCocktail();
    }

    fetchCocktail = async () => {
        this.setState({ loading: true })
        const response = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${this.state.pageNumber}&perPage=20`);

        this.setState({
            cocktail: response.body.results,
            loading: false,
            count: response.body.count
        });
    }

    handleSubmit = async (e) => {
        e.prevent.default();
        await this.fetchCocktail();
    }

    handleChange = async (e) => {
        this.setState({ name: e.target.value });

    }

    render() {
        return (<>
            <div className="search-div">
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Search by Name" className="search-bar" onChange={this.handleChange} />
                    <button className="search-button">Submit</button>
                </form>
                <div>
                    {this.state.count} total cocktails in query
            </div>
            </div>
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
                                        <img src={cocktail.img} alt={cocktail.name} width="100" height="100" />
                                        <div>Type: {cocktail.strength}</div>
                                        <div>Attack: {cocktail.alcohol_type}</div>
                                        <div>Defense: {cocktail.hot_drink}</div></div>
                                </div>)
                    }
                </div>
            </div></>
        )
    }
}
