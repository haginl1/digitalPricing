import React from 'react';
import { NavLink, Switch } from "react-router-dom";

export default class QuoteHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.updateCurrentQuote = this.updateCurrentQuote.bind(this)
    }

    componentDidMount(props) {
    }

    updateCurrentQuote(event) {
        this.props.setCurrentQuote(this.props.quote)
    }

    render() {
        return (
            <tr key={this.props.quote.id}>
                <td>{this.props.quote.date}</td>
                <td>{this.props.quote.company}</td>
                <td>{this.props.quote.description}</td>
                <td>
                    <form onSubmit={this.viewQuote}>
                        <NavLink to='/details'>
                            <button onClick={this.updateCurrentQuote} id={this.props.quote.id} className="btn btn-default" type="submit" to="/details">
                                View 
                            </button>
                        </NavLink>
                    </form>
                </td>
            </tr>
        );
    }
}