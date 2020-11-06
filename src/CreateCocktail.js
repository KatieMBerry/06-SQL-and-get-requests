import React, { Component } from 'react';
import { fetchAlcohols, createCocktail } from 'fetches.js';

const user = {
    userId: 1
};

export default class CreateCocktail extends Component {

    state = {
        name: '',
        alcoholId: 1,
        strength: 1,
        hot_drink: true,
        alcohols: []
    }

    componentDidMount = async () => {
        const alcohols = await fetchAlcohols();
        this.setState({ alcohols });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await createCocktail({
            name: this.state.name,
            alcohol_id: this.state.alcoholId,
            strength: this.state.strength,
            hot_drink: this.state.hot_drink,
            owner_id: user.userId
        });

        this.props.history.push('/cocktails');
    }

    handleChange = (e) => {
        this.setState({ alcoholId: e.target.value });
    }

    render() {

        return (
            <div>
                <h1>Create a Cocktail</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label>
                        Name
                        <input onChange={e => this.setState({ name: e.target.value })} type="text" />
                    </label>

                    <label>
                        Alcohol Type
                        <select onChange={this.handleChange}>
                            {
                                this.state.alcohols.map(alcohol => <option key={alcohol.type} value={alcohol.id}>
                                    {alcohol.type}
                                </option>)
                            }
                        </select>
                    </label>

                    <label>
                        Strength
                    <input onChange={e => this.setState({ strength: e.target.value })} type="number" />
                    </label>

                    <label>
                        Hot Drink?
                        <select onChange={e => this.setState({ hot_drink: e.target.value })} >
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

