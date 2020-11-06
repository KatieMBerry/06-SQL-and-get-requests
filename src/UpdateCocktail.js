import React, { Component } from 'react';
import {
    getAlcohols,
    getCocktail,
    updateCocktail,
    deleteCocktail

} from './utils.js';

const user = {
    userId: 1
};

export default class UpdateCocktail extends Component {

    state = {
        name: '',
        alcoholId: 1,
        strength: 1,
        hot_drink: '',
        alcohols: []
    }

    componentDidMount = async () => {
        const alcohols = await getAlcohols();
        const cocktail = await getCocktail(this.props.match.params.id);

        const matchingAlcohol = alcohols.find((alcohol) => {
            return alcohol.type === cocktail.type;
        });

        this.setState({
            alcohols,
            name: cocktail.name,
            alcoholId: matchingAlcohol.id,
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

        this.props.history.push('/cocktails');
    }

    handleDelete = async (e) => {
        e.preventDefault();

        await deleteCocktail(
            this.props.match.params.id,
            {
                name: this.state.name,
                alcohol_id: this.state.alcoholId,
                strength: this.state.strength,
                hot_drink: this.state.hot_drink,
                owner_id: user.userId
            });

        this.props.history.push('/cocktails');
    }

    render() {

        return (
            <>
                <div>
                    <h1>Update a Cocktail</h1>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <label>
                            Name
                        <input
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })}
                                type="text" />
                        </label>

                        <label>
                            Alcohol Type
                        <select onChange={e => this.setState({ alcoholId: e.target.value })}>
                                {
                                    this.state.alcohols.map(alcohol =>
                                        <option
                                            selected={this.state.alcoholId === alcohol.id}
                                            key={alcohol.type}
                                            value={alcohol.id}>
                                            {alcohol.type}
                                        </option>)
                                }
                            </select>
                        </label>

                        <label>
                            Strength
                        <input
                                value={this.state.strength}
                                onChange={e => this.setState({ strength: e.target.value })}
                                type="number" />
                        </label>

                        <label>
                            Hot Drink?
                        <select onChange={e => this.setState({ hot_drink: e.target.value })} >
                                <option value={false}>
                                    False
                                </option>
                                <option value={true}>
                                    True
                                </option>
                            </select>
                        </label>
                        <button>Submit</button>
                    </form>
                </div>

                <div>
                    <form className="form" onSubmit={this.handleDelete}>
                        <button>Delete</button>
                    </form>
                </div>
            </>
        )
    }
}