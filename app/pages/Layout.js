import React from 'react';
import { Route, Switch } from "react-router-dom";
import QuoteHistory from "./QuoteHistory.js";
import NewQuote from "./NewQuote.js";
import NotFound from "./404.js";
import Contact from "./Contact.js";
import Nav from "../components/Layout/Nav.js";
import Footer from "../components/Layout/Footer.js";


export default class Layout extends React.Component {
  render() {
    const { location } = this.props;

    const containerStyle = {
      marginTop: "60px",
      backgroundColor: "#eeeeee"
    };
    return (
      <div>
        <Nav location={location} />
        <div className='container' style={containerStyle}>
          Strict mode in the house
          <div>
            <Switch>
              <Route path='/quote' component={NewQuote} />
              <Route path='/contact' component={Contact} />
              <Route exact path='/' component={QuoteHistory}/>
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