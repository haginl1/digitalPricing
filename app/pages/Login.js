
import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
    <div>
<h2 className="page-header">Account Login</h2>

<form method="post" action="/users/login" >
  <div className="form-group">
    <label>Username</label>
    <input type="text" className="form-control" name="username" placeholder="Username"></input>
  </div>
  <div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" name="password" placeholder="Password"></input>
  </div>
 
  <button type="submit" className="btn btn-default">Submit</button>
</form>
      
    </div>
    );
  }
}




