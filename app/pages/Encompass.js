import React from 'react';
import { Route, Switch } from "react-router-dom";
import QuoteHistory from "./QuoteHistory.js";
import NewQuote from "./NewQuote.js";
import NotFound from "./404.js";
import Contact from "./Contact.js";
import Nav from "../components/Layout/Nav.js";
import Footer from "../components/Layout/Footer.js";
import QuoteDetails from "./QuoteDetails.js"


export default class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userID:"",
			currentQuote:""
		}
		this.setCurrentQuote = this.setCurrentQuote.bind(this)
	}

	setCurrentQuote(row) {
		this.setState({currentQuote: row})
	}

	render() {
		const { location } = this.props;

		return (
			<div>
				<Route exact path='/' render={routeProps => <NewQuote {...routeProps} embedded={true} setCurrentQuote={this.setCurrentQuote} currentQuote={this.state.currentQuote}/>} />
			</div>
		);
	}
}