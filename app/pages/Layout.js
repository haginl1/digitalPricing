import React from 'react';
import { Route, Switch } from "react-router-dom";
import QuoteHistory from "./QuoteHistory.js";
import NewQuote from "./NewQuote.js";
import NotFound from "./404.js";
import Contact from "./Contact.js";
import Nav from "../components/Layout/Nav.js";
import Footer from "../components/Layout/Footer.js";
import QuoteDetails from "./QuoteDetails.js";
import Register from "./Register.js";
import Login from "./Login.js";
import Logout from "./Logout.js";


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
              <Route path='/register' component={Register}/>
              <Route path='/quote' component={NewQuote} />
              <Route path='/login' component={Login}/>
              <Route path='/logout' component={Logout} />
              <Route path='/contact' component={Contact} />
              <Route exact path='/details' render={routeProps => <QuoteDetails {...routeProps} currentQuote={this.state.currentQuote}/>} />
            <Route exact path='/' render={routeProps => <QuoteHistory {...routeProps} setCurrentQuote={this.setCurrentQuote} currentQuote={this.state.currentQuote}/>} /> 
           { /*  <Route exact path='/' component={Login} />*/}
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