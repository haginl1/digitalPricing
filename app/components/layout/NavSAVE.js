import React from "react";
import { NavLink } from "react-router-dom";

export default class Nav extends React.Component {
  constructor(){
    super();
    this.state = {
      collapsed: true
    }
     this.userLogout=this.userLogout.bind(this)
  }
  //using state instead of jQuery to toggle top nav for mobile browsers
  toggleClass(){
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  userLogout() {
    this.props.setThisUserID("")
    console.log(this.props.setThisUserID);
  }
   
  render() {
    const { collapsed } = this.state;
    const { pathname } = this.props.location;
    const navClass = collapsed ? "collapse":'';
    const historyClass = pathname === '/' ? 'active':'';
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
            
            </button>
          </div>
          <div className={"navbar-collapse " + navClass} id="navbarContent">
            <ul className="nav navbar-nav">
             
              <li className={registerClass}><NavLink to='/register'>Register</NavLink></li>

              <li className={historyClass}><NavLink to='/'>Quote History</NavLink></li> 
              <li className={quoteClass}><NavLink to='/quote' >New Quote</NavLink></li>
              <li className={loginClass}><NavLink to='/login' >Login</NavLink></li>
              <li className={logoutClass}><NavLink to='/login' onClick={this.userLogout}>Logout</NavLink></li>
              <li className={contactClass}><NavLink to='/contact'>Contact Us</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}