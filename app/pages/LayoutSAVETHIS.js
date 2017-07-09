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

    console.log(userID)
        if (this.state.userID === "123") {
           console.log(this.state.userID);
           {/*return (<QuoteHistory userID={this.state.userID} setCurrentQuote={this.state.setCurrentQuote} {...this.state}/>)*/}
            return (<QuoteHistory/>)
         } else {
          console.log('user not found')
          return (<Register/>)

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
            <Switch> 
              <Route path='/login' component={Login}/> 
              <Route path='/logout' component={Logout} />
              <Route exact path='/quote' render={routeProps => <NewQuote {...routeProps} setCurrentQuote={this.setCurrentQuote} embedded={false} userID={this.state.userID} currentQuote={this.state.currentQuote}/>} />
              <Route path='/contact' component={Contact} />
              <Route exact path='/details' render={routeProps => <QuoteDetails {...routeProps} currentQuote={this.state.currentQuote}/>} />
           <Route exact path='/' render={routeProps => <QuoteHistory {...routeProps} setCurrentQuote={this.setCurrentQuote} currentQuote={this.state.currentQuote}/>} /> 
           {/*  <Route exact path='/' render={routeProps => <QuoteHistory {...routeProps} />} showAuthenticatedUser={this.state.showAuthenticatedUser}/>} /> */}
              <Route exact path='/register' render={routeProps => <Register {...routeProps} setThisUserID={this.setCurrentUserID}/>} /> 
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