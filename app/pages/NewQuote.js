import React from 'react';
import Calc from './Calc';

import SaveQuoteButton from './SaveQuoteButton';
import EncompassQuote from './EncompassQuote';


export default class Archives extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                company:"",
                description:""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
}

    handleInputChange(event) {
        console.log("got here")
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
                        [name]: value
        }, () => {
        });
    }

    



    render() {
        return (
            <div>
                <div className="container-fluid ">
                    <div className="row content">
                        <div className="col-sm-12 sidenav">
                            <div className="panel panel-primary">
                                <div className="panel-heading"><p>Define Quote Details</p></div>
                                <div className="panel-body">
                                    <div id="main_form" className="button-size">
                                        <div className="form-group">
                                            <h4>Enter the opportunity details.</h4>
                                            <input name="company"  onChange={this.handleInputChange} value={this.state.company} type="text" className="form-control" required placeholder="Company Name"></input>
                                            <input name="description"  onChange={this.handleInputChange} value={this.state.description} type="text" className="form-control" required placeholder="Proposal Description"></input>
                                        </div>
                                        <EncompassQuote setCurrentQuote={this.props.setCurrentQuote} userID={this.props.userID} company={this.state.company} description={this.state.description} embedded={this.props.embedded}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
