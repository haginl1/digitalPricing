import React from 'react';
// import {  } from 'react-router-dom'
import { NavLink, Switch } from "react-router-dom";

export default class Register extends React.Component {
  // handleRegister: function(e){
  //   e.preventDefault();
  //   console.log('clicked');
  // }

 constructor(props) {
        super(props);
        this.state = {
          name: "",
          email: "",
          username: "",
          password: "",
          password2: ""
      }
        this.registerUser = this.registerUser.bind(this)
        this.nameChange=this.nameChange.bind(this)
        this.usernameChange=this.usernameChange.bind(this)
        this.emailChange=this.emailChange.bind(this)
        this.passwordChange=this.passwordChange.bind(this)
        this.password2Change=this.password2Change.bind(this)


    }

 registerUser() {
    const APIURL =  '/users/register'
    const user = {
      'name': this.state.name,
      'email': this.state.email,
      'username': this.state.username,
      'password': this.state.password,
      'password2': this.state.password2
      
    }  
    console.log("use is:")
    console.log(user)
        axios.post(APIURL, user)
            .then(function (response) {
           this.props.setThisUserID(response.data._id)
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
                
  }

  nameChange(event) {

        this.setState({name: event.target.value});
    }

  emailChange(event) {
        this.setState({email: event.target.value});
    } 

  usernameChange(event) {
        this.setState({username: event.target.value});
    } 

  passwordChange(event) {
        this.setState({password: event.target.value});
    }  

  password2Change(event) {
        this.setState({password2: event.target.value});
    } 

  render() {
    return (
      <div>
        <h2>Register</h2>
        <hr/>
        <form >
          <div className="form-group">
            <label>Name</label>
            <input type="text" onChange={this.nameChange} className="form-control" placeholder="Name" name="name"></input>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" onChange={this.usernameChange} className="form-control" placeholder="Username" name="username"></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="Email" onChange={this.emailChange} className="form-control" placeholder="Email" name="email"></input>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" onChange={this.passwordChange} className="form-control" placeholder="Password" name="password"></input>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" onChange={this.password2Change} className="form-control" placeholder="Password" name="password2"></input>
          </div>
          
          
            <button
            className="btn btn-success"
            type="button"
            onClick={this.registerUser}>
            Submit
            </button>
          
        </form>
        
      </div>
    );
  }
}
