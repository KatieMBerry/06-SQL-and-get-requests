import React, { Component } from 'react';
import request from 'superagent';

const user = {
    userId: 1
};

export default class CreateCocktail extends Component {

    state = {
        name: '',
        alcohols: [],
        hot_drink: []
    }

    componentDidMount = async () => {
        const response = await request.get(`https://pacific-garden-61897.herokuapp.com/alcohols`);

        this.setState({ alcohols: response.body });
    }


    handleSubmit = async (e) => {
        e.prevent.default();

        const newCocktail = {
            name: this.setState.cocktailName,
            alcohol_id: this.setState.alcoholId,
            strength: this.setState.cocktailStrength,
            hot_drink: this.setState.hotDrink
        };

        const cocktail = await request
            .post(`https://pacific-garden-61897.herokuapp.com/cocktails`)
            .send(newCocktail);

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h1>Create a Cocktail</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label>
                        Name
                        <input onChange={e => this.setState({ cocktailName: e.target.value })} type="text" />
                    </label>

                    <label>
                        Alcohol Type
                        <select onChange={this.handleChange}>
                            {
                                this.state.alcohols.map(type => <option key={type.id} value={type.id}>
                                    {type.type}
                                </option>)
                            }
                        </select>
                    </label>

                    <label>
                        Strength
                    <input onChange={e => this.setState({ cocktailStrength: e.target.value })} type="number" />
                    </label>

                    <label>
                        Hot Drink?
                        <select onChange={e => this.setState({ hotDrink: e.target.value })} type="text">
                            {/* {
                                this.state.cocktails.map(cocktail => <option key={cocktail.hot_drink} value={cocktail.hot_drink}>
                                    {cocktail.hot_drink}
                                </option>)
                            } */}
                        </select>
                    </label>

                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

