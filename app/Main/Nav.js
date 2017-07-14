import React from "react";
import { NavLink } from "react-router-dom";

export default class Nav extends React.Component {
  constructor(){
    super();
    this.state = {
      collapsed: false
    }
     this.userLogout=this.userLogout.bind(this)
  }

  toggleClass(){
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  userLogout() {
    this.props.setThisUserID("")
  }

  buildMenu () {
    const { pathname } = this.props.location;
    const historyClass = pathname === '/' ? 'active':'';
    const quoteClass = pathname.match(/^\/quote/) ? 'active':'' ;
    const loginClass = pathname.match(/^\/login/) ? 'active':'' ;
    const registerClass = pathname.match(/^\/register/) ? 'active':'' ;
    const contactClass =  pathname.match(/^\/contact/) ? 'active':'';
    if (this.props.userID){
          return (
            <ul className="nav navbar-nav">
              <li className={historyClass}><NavLink to='/'>Quote History</NavLink></li> 
              <li className={quoteClass}><NavLink to='/quote' >New Quote</NavLink></li>
              <li className={loginClass}><NavLink to='/login' onClick={this.userLogout}>Logout</NavLink></li>
              <li className={contactClass}><NavLink to='/contact'>Contact Us</NavLink></li>
            </ul>    )}
      else{
        return (
          <ul className="nav navbar-nav">
              <li className={loginClass}><NavLink to='/login' >Login</NavLink></li>
              <li className={registerClass}><NavLink to='/register'>Register</NavLink></li>
              <li className={contactClass}><NavLink to='/contact'>Contact Us</NavLink></li>
            </ul>    )} 
      }
 
  render() {
    const navClass = !collapsed 
    ? "collapse"
    :'';
    const { collapsed } = this.state;
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/"><img src ="./assets/img/logo-50.png" alt="logo"/></a>
              <button type="button" className="navbar-toggle collapsed" 
                onClick={this.toggleClass.bind(this)} 
                data-toggle="collapse" 
                data-target="#navbarContent" 
                aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
          </div>
          <div className={"navbar-collapse " + navClass} id="navbarContent">
            {this.buildMenu()}
          </div>
        </div>
      </nav>
    )
  }
}