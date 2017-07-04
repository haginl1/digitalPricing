import React from 'react';
import Calc from './Calc';

export default class Archives extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quoteNewEstimate:0,
            quoteOldEstimate:0,
            company:"",
            description:"",
            contractTerm: 3,
            yearOneChannels: 1,
            yearTwoChannels: 1,
            yearThreeChannels: 1,
            HLS: true,
            HDS: false,
            MPEGDASH: false,
            RTMP: false,
            supportPlan: "Gold"
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.getEstimate = this.getEstimate.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
            this.getEstimate()
        });
        
    }

    getEstimate() {
        const APIURL =  '/api/estimate'
                        + "/" + this.state.contractTerm
                        + "/" + this.state.yearOneChannels
                        + "/" + this.state.yearTwoChannels
                        + "/" + this.state.yearThreeChannels
                        + "/" + this.state.HLS
                        + "/" + this.state.HDS
                        + "/" + this.state.MPEGDASH
                        + "/" + this.state.RTMP
                        + "/" + this.state.supportPlan
        axios.get(APIURL)
            .then(function (response) {
                console.log(response.data.estimate)
                this.setState({quoteOldEstimate: this.state.quoteNewEstimate})
                this.setState({quoteNewEstimate: response.data.estimate})
            }.bind(this))
            .catch(function (error) {
                console.log(error);
                this.setState({quoteNewEstimate: "UNKNOWN"})
            })
                
	}

  render() {
    return (
      <div>
        <h1>New Quote</h1>
        <div className="container-fluid ">    
        <div className="row content">
          <div className="col-sm-6 sidenav">
            <div className="well">
              <div className="panel panel-primary">
                  <div className="panel-heading">Define Quote Details</div>
                  <div className="panel-body">
                      <form id="main_form" className="button-size">
                  <div className="form-group">
                      <h4> 1. Enter the opportunity details.</h4>
                          <input name="company" onChange={this.handleInputChange} value={this.state.company} type="text" className="form-control" required placeholder="Company Name"></input>
                          <input name="description" onChange={this.handleInputChange} value={this.state.description} type="text" className="form-control" required placeholder="Proposal Description"></input>
                      <h4> 2. Select the protocols you need.</h4>
                      <label className="checkbox-inline">
                          <input name="HLS" checked={this.state.HLS} onChange={this.handleInputChange} type="checkbox" />HLS (Recommended)
                      </label>
                      <label className="checkbox-inline">
                          <input name="HDS" checked={this.state.HDS} onChange={this.handleInputChange} type="checkbox"/>HDS 
                      </label>
                      <label className="checkbox-inline">
                          <input name="RTMP" checked={this.state.RTMP} onChange={this.handleInputChange} type="checkbox"/>RTMP
                      </label>
                      <label className="checkbox-inline">
                          <input name="MPEGDASH" checked={this.state.MPEGDASH} onChange={this.handleInputChange} type="checkbox"/>MPEG-DASH
                      </label>
                      <br/>
                      
                      <br/>
                      <h4> 3. Select a contract term in years.</h4>
                      <select name="contractTerm" value={this.state.contractTerm} onChange={this.handleInputChange} className="selectpicker" id="contract_term" required title="Choose one of the following...">
                          <option id="contract_term_1">1</option>
                          <option id="contract_term_2">2</option>
                          <option selected id="contract_term_3">3</option>
                      </select>
                      <h4> 4. Enter the number of streams you need each year.</h4>
                          <input name="yearOneChannels" onChange={this.handleInputChange} value={this.state.yearOneChannels} type="number" min="1" step="1" id="year_one_channels" className="form-control" required placeholder="Channels in Year 1"></input>
                          <input name="yearTwoChannels" onChange={this.handleInputChange} value={this.state.yearTwoChannels} type="number" min="1" step="1" id="year_two_channels" className="form-control"  required placeholder="Channels in Year 2"></input>
                          <input name="yearThreeChannels" onChange={this.handleInputChange} value={this.state.yearThreeChannels} type="number" min="1" step="1" id="year_three_channels" className="form-control" required placeholder="Channels in Year 3"></input>
                      <h4> 5. Select a support plan for your services.</h4>
                      <div className="radio">
                          <ul>
                              <label><input onChange={this.handleInputChange} type="radio" name="gold" checked value="Gold"/>Gold</label>
                              <label><input onChange={this.handleInputChange} type="radio" name="platinum" value="Platinum"/>Platinum</label>
                          </ul>
                      </div>
                      <ul>
                          <button className="btn btn-success" type="submit" onSubmit={this.handleFormSubmit}>Calculate</button>
                      </ul>
                  </div>
              </form>
                  </div> 
              </div>
            </div>
          </div>

          <div className="col-sm-6 sidenav">
            <div className="well">
                  <div className="panel panel-primary">
                      <div className="panel-heading">Current</div>
                      <div className="panel-body"><Calc oldEstimate={this.state.quoteOldEstimate} newEstimate={this.state.quoteNewEstimate}/></div>
                  </div>
            </div>
          </div>
        </div>
      </div>

       
      </div>
    );
  }
}