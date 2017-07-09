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
      userID:"123",
      currentQuote:""

    }
    this.setCurrentQuote = this.setCurrentQuote.bind(this)
    this.setCurrentUserID = this.setCurrentUserID.bind(this)
    this.showAuthenticatedUser = this.showAuthenticatedUser.bind(this)
  }
     
  showAuthenticatedUser() {
    console.log('in authenticated user')
    console.log(this.state.userID)
        if (this.state.userID) {
          console.log(this.state.userID);
          console.log('You are signed in!');
          return ( <Switch> 
              <Route path='/logout' component={Logout} />
              <Route exact path='/quote' render={routeProps => <NewQuote {...routeProps} setCurrentQuote={this.setCurrentQuote} embedded={false} userID={this.state.userID} currentQuote={this.state.currentQuote}/>} />
              <Route path='/contact' component={Contact} />
              <Route exact path='/details' render={routeProps => <QuoteDetails {...routeProps} currentQuote={this.state.currentQuote}/>} />
              <Route exact path='/' render={routeProps => <QuoteHistory {...routeProps} setCurrentQuote={this.setCurrentQuote} currentQuote={this.state.currentQuote}/>} /> 
              <Route exact path='*' component={QuoteHistory} />
            </Switch>)
         } else {
          console.log(this.state.userID);
          console.log('Sign In Failed.');
          return ( <Switch> 
              <Route path='/contact' component={Contact} />
              <Route exact path='*' component={Login} />
            </Switch>);
        }
  }

  setCurrentQuote(row) {
    this.setState({currentQuote: row})
  }

  setCurrentUserID(userid) {
    console.log('in setcurrentuser');
    console.log(userid);
    this.setState({userID: userid})
    console.log('set state');
    console.log(this.state.userID);
  }

  render() {
    const { location } = this.props;

    return (
      <div>
        <Nav location={location} />
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
