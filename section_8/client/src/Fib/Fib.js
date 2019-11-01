import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetechValues();
        this.FetechIndexes();
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({ index: '' })
    }
    async fetechValues() {
        const values = await axios.get("/api/values/current");
        this.setState({ values: values.data });
    }

    async FetechIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({
            seenIndexes: seenIndexes.data
        });
    }

    renderSeenIndexes() {
        return this.state
                .seenIndexes
                .map(({ number }) => number)
                .join(', ');
    }

    renderCalculatedValues() {
        const enteries = [];

        for(let key in this.state.values) {
            enteries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[{key}]}
                </div>
            );
        }
        return enteries;
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <label>Enter your index</label>\
                    <input 
                        value={this.state.index}
                        onChange={ event => this.setState({ index: event.target.value })}
                    />
                    <button>Subbmit</button>

                    <h3>Indexes I have seen:</h3>
                    {this.renderSeenIndexes()}

                    <h3>Calculated Values:</h3>
                    {this.renderCalculatedValues()}
                </form>
            </div>
        )
    }
}
export default Fib;