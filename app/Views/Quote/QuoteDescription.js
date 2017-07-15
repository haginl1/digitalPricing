import React from 'react';

export default class Description extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				company: "",
				description: ""
			}
	}

	// onInputChange(event) {
 //    	const target = event.target;
 //    	const value = target.type === 'checkbox' ? target.checked : target.value;
 //    	const name = target.name;
 //    	this.setState({
 //    		[name]: value
 //    	}, () => {

 //    	});
 //    }

    onInputChange(term) {
    	this.setState({term});
    	this.props.onInputChange(term);
    }

    //onChange={event => this.onInputChange(event.target.value)}

	render() {
	    return (
	    	<div>
	        <form id="main_form" className="button-size" onChange={event => this.onInputChange(event.target.value)}>
                <div className="form-group">
	            <h4>Enter the opportunity details:</h4>
	                <input name="company"  value={this.state.company} type="text" className="form-control" required placeholder="Company Name"></input>
	                <input name="description"  value={this.state.description} type="text" className="form-control" required placeholder="Proposal Description"></input>
	        	</div>
	        </form>
	    </div>
	    );
	}
}