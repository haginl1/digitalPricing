import React from 'react';
import Calc from './Calc';

const items = [
	'One',
	'Two',
	'Three',
];


export default class Archives extends React.Component {
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
	//new
	//   componentWillMount = () => {
	//   this.selectedCheckboxes = new Set();
	// }

	// toggleCheckbox = label => {
	//   if (this.selectedCheckboxes.has(label)) {
	//     this.selectedCheckboxes.delete(label);
	//   } else {
	//     this.selectedCheckboxes.add(label);
	//   }
	// }

	// handleFormSubmit = formSubmitEvent => {
	//   formSubmitEvent.preventDefault();

	//   for (const checkbox of this.selectedCheckboxes) {
	//     console.log(checkbox, 'is selected.');
	//   }
	// }

	// createCheckbox = label => (
	//   <Checkbox
	//     label={label}
	//     handleCheckboxChange={this.toggleCheckbox}
	//     key={label}
	//   />
	// )

	// createCheckboxes = () => (
	//   items.map(this.createCheckbox)
	// ){this.createCheckboxes()}
 

	render() {
		//console.log(this.props);

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
													<input type="text" name="company" className="form-control" required placeholder="Company Name"></input>
													<input type="text" name="description" className="form-control" required placeholder="Proposal Description"></input>
											<h4> 2. Select the protocols you need.</h4>
											<label className="checkbox-inline">
													<input type="checkbox" name="HLS" checked value="100" onChange={this.handleChange}/>HLS (Recommended)
											</label>
											<label className="checkbox-inline">
													<input type="checkbox" name="HDS" unchecked value="500" onChange={this.handleChange}/>HDS 
											</label>
											<label className="checkbox-inline">
													<input type="checkbox" name="RTMP" unchecked value="900" onChange={this.handleChange}/>RTMP
											</label>
											<label className="checkbox-inline">
													<input type="checkbox" name="MPEG_DASH" unchecked value="300" onChange={this.handleChange}/>MPEG-DASH
											</label>
											<br/>
											
											<br/>
											<h4> 3. Select a contract term in years.</h4>
											<select className="selectpicker" id="contract_term" name="contract_term" required title="Choose one of the following...">
													<option id="contract_term_1">1</option>
													<option id="contract_term_2">2</option>
													<option selected id="contract_term_3">3</option>
											</select>
											<h4> 4. Enter the number of streams you need each year.</h4>
													<input type="number" min="1" step="1" id="year_one_channels" name="year_one_channels" className="form-control" required placeholder="Channels in Year 1"></input>
													<input type="number" min="1" step="1" id="year_two_channels" name="year_two_channels" className="form-control"  required placeholder="Channels in Year 2"></input>
													<input type="number" min="1" step="1" id="year_three_channels" name="year_three_channels" className="form-control" required placeholder="Channels in Year 3"></input>
											<h4> 5. Select a support plan for your services.</h4>
											<div className="radio">
													<ul>
															<label><input type="radio" name="support_plan" checked value="Gold"/>Gold</label>
															<label><input type="radio" name="support_plan" value="Platinum"/>Platinum</label>
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
											<div className="panel-body"><Calc/></div>
									</div>
						</div>
					</div>
				</div>
			</div>

			 
			</div>
		);
	}
}