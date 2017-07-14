import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.login = this.login.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  login() {
    const APIURL = '/users/login';
    const user = {
      'username': this.state.username,
      'password': this.state.password
    }
    axios.post(APIURL, user)
      .then(function(response) {
        this.props.setThisUserID(response.data)
      }.bind(this))
      .catch(function(error) {
      });
  }

  usernameChange(event) {
        this.setState({username: event.target.value});
    } 

  passwordChange(event) {
        this.setState({password: event.target.value});
    }

  render() {
    return (
      <div>
        <h2 className="page-header">Account Login</h2>
        <form>
          <div className="form-group">
            <label>Username</label>
            <input type="text" onChange={this.usernameChange} className="form-control" name="username" placeholder="Username"></input>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" onChange={this.passwordChange} className="form-control" name="password" placeholder="Password"></input>
          </div>
            <button 
              type="button"
              onClick={this.login}
              className="btn btn-default login">
                Login
            </button>
            <NavLink to={'/register'}>
              <button
                type="button"
                className="btn btn-default register">
                  Register
              </button>
            </NavLink>
        </form>
        
      </div>
    );
  }
}




