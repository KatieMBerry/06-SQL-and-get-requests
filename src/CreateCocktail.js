import React, { Component } from 'react';
import request from 'superagent';

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
        const response = await request.get(`https://pacific-garden-61897.herokuapp.com/alcohols`);
        // const cocktails = await request.get(`https://pacific-garden-61897.herokuapp.com/cocktails`);
        this.setState({
            alcohols: response.body
            // hot_drink: cocktails.body
        });
    }



    handleSubmit = async (e) => {
        e.preventDefault();

        const newCocktail = {
            name: this.state.name,
            alcohol_id: this.state.alcoholId,
            strength: this.state.strength,
            hot_drink: this.state.hot_drink,
            owner_id: user.userId
        };

        await request
            .post(`https://pacific-garden-61897.herokuapp.com/cocktails`)
            .send(newCocktail);

        console.log(this.state);
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

