import React from 'react';
// import {  } from 'react-router-dom'
import { NavLink, Switch } from "react-router-dom";

export default class Register extends React.Component {
  // handleRegister: function(e){
  //   e.preventDefault();
  //   console.log('clicked');
  // }
  render() {
    return (
    <div>
    <h2>Register</h2>
    <form method="post" action="/users/register" onSubmit={this.handleRegister}>
 <div className="form-group">
    <label>Name</label>
    <input type="text" className="form-control" placeholder="Name" name="name"></input>
  </div>
  <div className="form-group">
    <label>Username</label>
    <input type="text" className="form-control" placeholder="Username" name="username"></input>
  </div>
   <div className="form-group">
    <label>Email</label>
    <input type="Email" className="form-control" placeholder="Email" name="email"></input>
  </div>
  <div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" placeholder="Password" name="password"></input>
  </div>
   <div className="form-group">
    <label>Confirm Password</label>
    <input type="password" className="form-control" placeholder="Password" name="password2"></input>
  </div>
 
  <button type="submit" className="btn btn-default">Submit</button>
</form>
      
    </div>
    );
  }
}
