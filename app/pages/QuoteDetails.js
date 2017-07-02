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
    //console.log(this.state)
    console.log(numbers)
  }

    componentDidMount(props) {
        console.log(this.props.currentQuote)
    }
    handleClick(){
        pdfMake.createPdf(docDefinition).download();
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
                        <h4 id="date">Date:</h4>
                        <p id="client">1. Client: {this.props.currentQuote.company}</p>
                        <p id="term">2. Contract Term: {this.props.currentQuote.contract_term} year(s)</p>
                        <p id="description">3. Proposal Description: {this.props.currentQuote.description}</p>
                        <p id="support">4. Support Plan: {this.props.currentQuote.support_plan}</p>
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
                                        <td id="year1channels">{this.props.currentQuote.year_one_channels}</td>
                                        <td id="year2channels">{this.props.currentQuote.year_two_channels}</td>
                                        <td id="year3channels">{this.props.currentQuote.year_three_channels}</td>
                                    </tr>
                                    <tr>
                                        <th>Setup Fee</th>
                                        <td id="year1setup">{this.props.currentQuote.year_one_setup_fee}</td>
                                        <td id="year2setup">{this.props.currentQuote.year_two_setup_fee}</td>
                                        <td id="year3setup">{this.props.currentQuote.year_three_setup_fee}</td>

                                    </tr>
                                    <tr>
                                        <th>Support</th>
                                        <td id="year1support">{this.props.currentQuote.year_one_support_fee}</td>
                                        <td id="year2support">{this.props.currentQuote.year_two_support_fee}</td>
                                        <td id="year3support">{this.props.currentQuote.year_three_support_fee}</td>

                                    </tr>
                                    <tr>
                                        <th>Monthly Fee </th>
                                        <td id="year1monthly">{this.props.currentQuote.year_one_monthly_streaming}</td>
                                        <td id="year2monthly">{this.props.currentQuote.year_two_monthly_streaming}</td>
                                        <td id="year3monthly">{this.props.currentQuote.year_three_monthly_streaming}</td>
                                    </tr>
                                    <tr>
                                        <th>Annual Fee</th>
                                        <td id="year1annual">{this.props.currentQuote.year_one_annual_fee}</td>
                                        <td id="year2annual">{this.props.currentQuote.year_two_annual_fee}</td>
                                        <td id="year3annual">{this.props.currentQuote.year_three_annual_fee}</td>
                                    </tr>
                                </thead>
                            </table>
                            <button type="submit" id="pdf" className="btn btn-success" onClick={this.handleClick}>Create PDF</button>
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