import React from 'react';

export default class Contact extends React.Component {
  render() {
    return (
    <div>
      <div className="col-sm-12">
        <div className="panel panel-primary">
          <div className="panel-heading"><h5>Contact Us</h5></div>
            <div className="panel-body">
              <div className="row">
                &nbsp;  &nbsp;  &nbsp;  &nbsp;Encompass is a global technology services company focused on supporting broadcast, cable and digital leaders. The company designs, implements and operates reliable video solutions to meet its clients’ needs in the most efficient and simple way possible. We would love to hear from you.
              </div>
              <br/><br/>
              <div className="row social">
                <a href="https://twitter.com/Encompass_Now" target="_blank"><i className="fa fa-twitter fa-4x" aria-hidden="true"></i></a>
                <a href="https://www.linkedin.com/company-beta/1110709/" target="_blank"><i className="fa fa-linkedin fa-4x" aria-hidden="true"></i></a>
                <a href="mailto:lhagin@encompass.tv?Subject=Hello%20Encompass"><i className="fa fa-envelope fa-4x" aria-hidden="true"></i></a>
              </div>
            </div>
        </div>
      </div>
    </div>
    );
  }
}