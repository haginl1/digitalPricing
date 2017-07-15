import React from 'react';
import Calc from './Calc';
import SaveQuoteButton from './SaveQuoteButton';

export default class QuoteForm extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				
			}

		this.handleInputChange = this.handleInputChange.bind(this)
    	this.getEstimate = this.getEstimate.bind(this)
    	this.showSaveQuoteButton = this.showSaveQuoteButton.bind(this)

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

    showSaveQuoteButton() {
        if (this.props.embedded === false) {
            return (<SaveQuoteButton userID={this.props.userID} setCurrentQuote={this.props.setCurrentQuote} {...this.state}/>)
        }
    }

    getEstimate() {
       // const APIURL =  '/api/estimate'
        const APIURL =  'https://quote-builder.herokuapp.com/api/estimate'
                        + "/" + this.state.contractTerm
                        + "/" + this.state.yearOneChannels
                        + "/" + this.state.yearTwoChannels
                        + "/" + this.state.yearThreeChannels
                        + "/" + this.state.HLS
                        + "/" + this.state.HDS
                        + "/" + this.state.MPEG_DASH
                        + "/" + this.state.RTMP
                        + "/" + this.state.supportPlan
        axios.get(APIURL)
            .then(function (response) {
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
            <div>
                <form id="main_form" className="button-size" onChange={this.handleInputChange}>
                    <div className="form-group">
                        <label className="checkbox-inline">
                            <input name="HLS" checked={this.state.HLS}  type="checkbox" />HLS (Recommended)
                        </label>
                        <label className="checkbox-inline">
                            <input name="HDS" checked={this.state.HDS}  type="checkbox"/>HDS
                        </label>
                        <label className="checkbox-inline">
                            <input name="RTMP" checked={this.state.RTMP}  type="checkbox"/>RTMP
                        </label>
                        <label className="checkbox-inline">
                            <input name="MPEG_DASH" checked={this.state.MPEG_DASH}  type="checkbox"/>MPEG-DASH
                        </label>
                        <br/>
                        
                        <br/>
                        <h4> 3. Select a contract term in years.</h4>
                        <select name="contractTerm" value={this.state.contractTerm}  className="selectpicker" id="contract_term" required title="Choose one of the following...">
                            <option id="contract_term_1">1</option>
                            <option id="contract_term_2">2</option>
                            <option defaultValue id="contract_term_3">3</option>
                        </select>
                        <h4> 4. Enter the number of streams you need each year.</h4>
                        <input name="yearOneChannels"  value={this.state.yearOneChannels} type="number" min="1" step="1" id="year_one_channels" className="form-control" required placeholder="Channels in Year 1"></input>
                        <input name="yearTwoChannels"  value={this.state.yearTwoChannels} type="number" min="1" step="1" id="year_two_channels" className="form-control"  required placeholder="Channels in Year 2"></input>
                        <input name="yearThreeChannels"  value={this.state.yearThreeChannels} type="number" min="1" step="1" id="year_three_channels" className="form-control" required placeholder="Channels in Year 3"></input>
                        <h4> 5. Select a support plan for your services.</h4>
                        <select name="supportPlan" value={this.state.supportPlan}  className="selectpicker" id="support_plan" required>
                            <option defaultValue id="support_plan_gold">Gold</option>
                            <option id="support_plan_platinum">Platinum</option>
                        </select>
                        <p></p>
                        {this.showSaveQuoteButton()}
                    </div>
                </form>
            </div>
           </div>
        );
    }  

  //   render() {
  //   	return (
		// <form id="main_form" className="button-size" onChange={this.handleInputChange}>
		// 	<div className="form-group">
		// 		<h4>Select required protocols:</h4>
		// 		<label className="checkbox-inline">
		// 			<input name="HLS" checked={this.state.HLS}  type="checkbox" />HLS (Recommended)
		// 		</label>
		// 		<label className="checkbox-inline">
		// 			<input name="HDS" checked={this.state.HDS}  type="checkbox"/>HDS
		// 		</label>
		// 		<label className="checkbox-inline">
		// 			<input name="RTMP" checked={this.state.RTMP}  type="checkbox"/>RTMP
		// 		</label>
		// 		<label className="checkbox-inline">
		// 			<input name="MPEG_DASH" checked={this.state.MPEG_DASH}  type="checkbox"/>MPEG-DASH
		// 		</label>
		// 		<br/>
				
		// 		<br/>
		// 		<h4>Contract Term (Years):</h4>
		// 		<select name="contractTerm" value={this.state.contractTerm}  className="selectpicker" id="contract_term" required title="Choose one of the following...">
		// 			<option id="contract_term_1">1</option>
		// 			<option id="contract_term_2">2</option>
		// 			<option defaultValue id="contract_term_3">3</option>
		// 		</select>
		// 		<h4>Number of streams per year:</h4>
		// 		<input name="yearOneChannels"  value={this.state.yearOneChannels} type="number" min="1" step="1" id="year_one_channels" className="form-control" required placeholder="Channels in Year 1"></input>
		// 		<input name="yearTwoChannels"  value={this.state.yearTwoChannels} type="number" min="1" step="1" id="year_two_channels" className="form-control"  required placeholder="Channels in Year 2"></input>
		// 		<input name="yearThreeChannels"  value={this.state.yearThreeChannels} type="number" min="1" step="1" id="year_three_channels" className="form-control" required placeholder="Channels in Year 3"></input>
		// 		<h4>Upgrade to Platinum Support:</h4>
		// 		<select name="supportPlan" value={this.state.supportPlan}  className="selectpicker" id="support_plan" required>
		// 			<option defaultValue id="support_plan_gold">Gold</option>
		// 			<option id="support_plan_platinum">Platinum</option>
		// 		</select>
		// 		<p></p>
		// 		{this.showSaveQuoteButton()}
		// 	</div>
		// </form>
		// <div className="col-sm-6 sidenav">
		// 	<div className="priceTag">
		// 		<Calc oldEstimate={this.state.quoteOldEstimate} newEstimate={this.state.quoteNewEstimate}/>
		// 	</div>
		// </div>
  //   	);
  //   }




}