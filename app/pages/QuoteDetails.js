import React from 'react';

export default class QuoteDetails extends React.Component {
 constructor(props) {
    super(props);
    this.state = {value:''};

    this.handleChange = this.handleChange.bind(this);
  }
    handleChange(event) {
    this.setState({value:event.target.value});
    const numbers = []
    numbers.push(event.target.value)
  }

  	componentDidMount(props) {
	}

  render() {
    return (
<div className="container-fluid ">
    <div className="row content">
        <div className="col-sm-6 sidenav">
            <div className="well">
                <div className="panel panel-primary">
                    <div className="panel-heading">Define Quote Details</div>
                    <div className="panel-body">
                        <h4>Date:</h4>
                        <p>1. Client: {this.props.currentQuote.company}</p>
                        <p>2. Contract Term: {this.props.currentQuote.contract_term} year(s)</p>
                        <p>3. Proposal Description: {this.props.currentQuote.description}</p>
                        <p>4. Support Plan: {this.props.currentQuote.support_plan}</p>
                        <button>Create PDF
                        </button>
                    </div>
                </div>

            </div>
        </div>
        <div className="col-sm-6 sidenav">
            <div className="well">
                <div className="panel panel-primary">
                    <div className="panel-heading">Digital Streaming Prices for </div>
                    <div className="panel-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Year 1</th>
                                        <th>Year 2</th>
                                        <th>Year 3</th>
                                    </tr>
                                    <tr>
                                        <th># of Channels</th>
                                        <td>{this.props.currentQuote.year_one_channels}</td>
                                        <td>{this.props.currentQuote.year_two_channels}</td>
                                        <td>{this.props.currentQuote.year_three_channels}</td>
                                    </tr>
                                    <tr>
                                        <th>Setup Fee</th>
                                        <td>{this.props.currentQuote.year_one_setup_fee}</td>
                                        <td>{this.props.currentQuote.year_two_setup_fee}</td>
                                        <td>{this.props.currentQuote.year_three_setup_fee}</td>

                                    </tr>
                                    <tr>
                                        <th>Support</th>
                                        <td>{this.props.currentQuote.year_one_support_fee}</td>
                                        <td>{this.props.currentQuote.year_two_support_fee}</td>
                                        <td>{this.props.currentQuote.year_three_support_fee}</td>

                                    </tr>
                                    <tr>
                                        <th>Monthly Fee </th>
                                        <td>{this.props.currentQuote.year_one_monthly_streaming}</td>
                                        <td>{this.props.currentQuote.year_two_monthly_streaming}</td>
                                        <td>{this.props.currentQuote.year_three_monthly_streaming}</td>
                                    </tr>
                                    <tr>
                                        <th>Annual Fee</th>
                                        <td>{this.props.currentQuote.year_one_annual_fee}</td>
                                        <td>{this.props.currentQuote.year_two_annual_fee}</td>
                                        <td>{this.props.currentQuote.year_three_annual_fee}</td>
                                    </tr>
                                </thead>
                            </table>
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