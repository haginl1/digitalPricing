import React from "react";
import { NavLink } from "react-router-dom";

export default class Nav extends React.Component {
  constructor(){
    super();
    this.state = {
      collapsed: true
    }
  }
  //using state instead of jQuery to toggle top nav for mobile browsers
  toggleClass(){
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { collapsed } = this.state;
    const { pathname } = this.props.location;
    const navClass = collapsed ? "collapse":'';
  const historyClass = pathname === '/' ? 'active':'';
 { /* const loginClass = pathname === '/' ? 'active':'';*/}
    const quoteClass = pathname.match(/^\/quote/) ? 'active':'' ;
    const loginClass = pathname.match(/^\/login/) ? 'active':'' ;
    const registerClass = pathname.match(/^\/register/) ? 'active':'' ;
    const logoutClass = pathname.match(/^\/logout/) ? 'active':'' ;
    const contactClass =  pathname.match(/^\/contact/) ? 'active':'';
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
                <span className="icon-bar"></span>
            </button>
          </div>
          <div className={"navbar-collapse " + navClass} id="navbarContent">
            <ul className="nav navbar-nav">
             <li className={registerClass}><NavLink to='/register' onClick={this.toggleClass.bind(this)}>Register</NavLink></li>
           <li className={historyClass}><NavLink to='/' onClick={this.toggleClass.bind(this)}>Quote History</NavLink></li> 
 {/* <li className={loginClass}><NavLink to='/' onClick={this.toggleClass.bind(this)}>Login</NavLink></li> */}
              <li className={quoteClass}><NavLink to='/quote' onClick={this.toggleClass.bind(this)}>New Quote</NavLink></li>
            <li className={loginClass}><NavLink to='/login' onClick={this.toggleClass.bind(this)}>Login</NavLink></li>
              <li className={logoutClass}><NavLink to='/logout' onClick={this.toggleClass.bind(this)}>Logout</NavLink></li>
              <li className={contactClass}><NavLink to='/contact' onClick={this.toggleClass.bind(this)}>Contact Us</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}