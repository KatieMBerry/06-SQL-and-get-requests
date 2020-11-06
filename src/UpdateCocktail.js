import React, { Component } from 'react';
import {
    fetchAlcohols,
    fetchOneCocktail,
    updateCocktail

} from './fetches.js';

const user = {
    userId: 1
};

export default class UpdateCocktail extends Component {

    state = {
        name: '',
        alcoholId: 1,
        strength: 1,
        hot_drink: false,
        alcohols: []
    }

    componentDidMount = async () => {
        const alcohols = await fetchAlcohols();
        const cocktail = await fetchOneCocktail(this.props.match.params.id);
        const alcoholAsString = cocktail.alcohol_id;

        const matchingAlcohol = alcohols.find((alcohol) => {
            return alcohol.type === alcoholAsString
        });

        this.setState({
            alcohols,
            name: cocktail.name,
            alcoholId: matchingAlcohol.alcohol_id,
            strength: cocktail.strength,
            hot_drink: cocktail.hot_drink
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await updateCocktail(
            this.props.match.params.id,
            {
                name: this.state.name,
                alcohol_id: this.state.alcoholId,
                strength: this.state.strength,
                hot_drink: this.state.hot_drink,
                owner_id: user.userId
            });

        this.props.history.push('/');
    }

    handleChange = async (e) => {
        this.setState({
            alcoholId: e.target.value,
            name: e.target.value,
            strength: e.target.value,
            hot_drink: e.target.value
        });
    }

    render() {
        return (
            <div>
                <h1>Update a Cocktail</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label>
                        Name
                        <input
                            onChange={this.handleChange}
                            type="text" />
                    </label>

                    <label>
                        Alcohol Type
                        <select onChange={this.handleChange}>
                            {
                                this.state.alcohols.map(alcohol =>
                                    <option key={alcohol.type} value={alcohol.id}>
                                        {alcohol.type}
                                    </option>)
                            }
                        </select>
                    </label>

                    <label>
                        Strength
                        <input
                            value={this.state.strength}
                            onChange={e => this.handleChange}
                            type="number" />
                    </label>

                    <label>
                        Hot Drink?
                        <select onChange={this.handleChange} >
                            <option value={true}>
                                True
                                </option>)
                                <option value={false}>
                                False
                                </option>)
                        </select>
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
