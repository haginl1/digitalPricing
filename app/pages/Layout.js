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
        <Nav location={location} />
        <div className='container'>
          <div>
            <Switch>
              <Route path='/quote' component={NewQuote} />
              <Route path='/contact' component={Contact} />
              <Route exact path='/details' render={routeProps => <QuoteDetails {...routeProps} currentQuote={this.state.currentQuote}/>} />
              <Route exact path='/' render={routeProps => <QuoteHistory {...routeProps} setCurrentQuote={this.setCurrentQuote} currentQuote={this.state.currentQuote}/>} />
              <Route exact path='*' component={NotFound} />
            </Switch>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}