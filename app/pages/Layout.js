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
      userID: "",
      currentQuote: ""
    }
    this.setCurrentQuote = this.setCurrentQuote.bind(this)
    this.setCurrentUserID = this.setCurrentUserID.bind(this)
    this.showAuthenticatedUser = this.showAuthenticatedUser.bind(this)
  }
     
  showAuthenticatedUser() {
        if (this.state.userID) {
          return ( <Switch> 
              <Route exact path='/quote' render={routeProps => <NewQuote {...routeProps} setCurrentQuote={this.setCurrentQuote} embedded={false} userID={this.state.userID} currentQuote={this.state.currentQuote}/>} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/details' render={routeProps => <QuoteDetails {...routeProps} currentQuote={this.state.currentQuote}/>} />
              <Route exact path='/' render={routeProps => <QuoteHistory {...routeProps} setCurrentQuote={this.setCurrentQuote} userID={this.state.userID}/>} /> 
              <Route exact path='*' component={QuoteHistory} />
            </Switch>)
         } else {
          return ( <Switch> 
             <Route exact path='/register' render={routeProps => <Register {...routeProps} setThisUserID={this.setCurrentUserID}/>} />
             <Route exact path='/login' render={routeProps => <Login {...routeProps} setThisUserID={this.setCurrentUserID}/>} />
            <Route path='/contact' component={Contact} />
             <Route path='/*' render={routeProps => <Login {...routeProps} setThisUserID={this.setCurrentUserID}/>} />
            </Switch>);
        }
  }

  setCurrentQuote(quote) {
    this.setState({currentQuote: quote})
  }

  setCurrentUserID(userid) {
    this.setState({userID: userid})
  }

  render() {
    const { location } = this.props;

    return (
      <div>
        <Nav location={location} setThisUserID={this.setCurrentUserID} />
        <div className='container'>
          <div>
              {this.showAuthenticatedUser()}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
