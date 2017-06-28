import React from 'react';

export default class Footer extends React.Component {
  render() {
    const footerStyle = {
      textAlign: "center",
      backgroundColor: "#282a2b",
      color: "white",
      padding:"5px"
    }
    return (
      <footer className="col-xs-12 container-fluid text-center navbar-fixed-bottom" style={footerStyle}>
        Copyright &copy; ENCOMPASS, ALL RIGHTS RESERVED.
      </footer>
    );
  }
}