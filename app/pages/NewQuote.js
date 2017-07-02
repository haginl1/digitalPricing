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
        this.state = {
            quoteNewEstimate:0,
            quoteOldEstimate:0,
            quoteOptions:{},
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
        },
        this.setQuoteOptions = this.setQuoteOptions.bind(this);
        this.companyChange = this.companyChange.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);
        this.contractTermChange = this.contractTermChange.bind(this);
        this.yearOneChannelsChange = this.yearOneChannelsChange.bind(this);
        this.yearTwoChannelsChange = this.yearTwoChannelsChange.bind(this);
        this.yearThreeChannelsChange = this.yearThreeChannelsChange.bind(this);
        this.HLSChange = this.HLSChange.bind(this);
        this.HDSChange = this.HDSChange.bind(this);
        this.MPEGDASHChange = this.MPEGDASHChange.bind(this);
        this.RTMPChange = this.RTMPChange.bind(this);
        this.supportPlanChange = this.supportPlanChange.bind(this);
    }

    companyChange(event) {
        this.setState({company: event.target.value});
        this.setQuoteOptions()
    }

    descriptionChange(event) {
        this.setState({description: event.target.value});
        this.setQuoteOptions()
    }

    contractTermChange(event) {
        this.setState({contractTerm: event.target.value});
        this.setQuoteOptions()
        this.getEstimate(this.state.quoteOptions)
    }

    yearOneChannelsChange(event) {
        this.setState({yearOneChannels: event.target.value});
        this.setQuoteOptions()
        this.getEstimate(this.state.quoteOptions)
    }

    yearTwoChannelsChange(event) {
        this.setState({yearTwoChannels: event.target.value});
        this.setQuoteOptions()
        this.getEstimate(this.state.quoteOptions)
    }

    yearThreeChannelsChange(event) {
        this.setState({yearThreeChannels: event.target.value});
        this.setQuoteOptions()
        this.getEstimate(this.state.quoteOptions)
    }

    HLSChange(event) {
        this.setState({HLS: event.target.value});
        this.setQuoteOptions()
        this.getEstimate(this.state.quoteOptions)

    }

    HDSChange(event) {
        this.setState({HDS: event.target.value});
        this.setQuoteOptions()
        this.getEstimate(this.state.quoteOptions)
    }

    MPEGDASHChange(event) {
        this.setState({MPEGDASH: event.target.value});
        this.setQuoteOptions()
        this.getEstimate(this.state.quoteOptions)
    }

    RTMPChange(event) {
        this.setState({RTPM: event.target.value});
        this.setQuoteOptions()
        this.getEstimate(this.state.quoteOptions)
    }

    supportPlanChange(event) {
        this.setState({supportPlan: event.target.value});
        this.setQuoteOptions()
        this.getEstimate(this.state.quoteOptions)

    }

    setQuoteOptions() {
        this.setState({quoteOptions: {
            company: this.state.company,
            contract_term: this.state.contractTerm,
            description: this.state.description,
            support_plan: this.state.supportPlan,
            year_one_channels: this.state.yearOneChannels,
            year_two_channels: this.state.yearTwoChannels,
            year_three_channels: this.state.yearThreeChannels,
            HLS: this.state.HLS,
            HDS: this.state.HDS,
            MPEG_DASH: this.state.MPEG_DASH,
            RTMP: this.state.RTMP
        }}) 
        console.log(this.state.quoteOptions)
    }

    getEstimate(quoteOptions) {
        axios.get('/api/estimate')
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
                          <input name="company" onChange={this.companyChange} value={this.state.company} type="text" className="form-control" required placeholder="Company Name"></input>
                          <input name="description" onChange={this.descriptionChange} value={this.state.description} type="text" className="form-control" required placeholder="Proposal Description"></input>
                      <h4> 2. Select the protocols you need.</h4>
                      <label className="checkbox-inline">
                          <input name="HLS" defaultChecked={this.state.HLS} onChange={this.HLSChange} type="checkbox" />HLS (Recommended)
                      </label>
                      <label className="checkbox-inline">
                          <input name="HDS" defaultChecked={this.state.HDS} onChange={this.HDSChange} type="checkbox"/>HDS 
                      </label>
                      <label className="checkbox-inline">
                          <input name="RTMP" defaultChecked={this.state.RTMP} onChange={this.RTMPChange} type="checkbox"/>RTMP
                      </label>
                      <label className="checkbox-inline">
                          <input name="MPEG_DASH" defaultChecked={this.state.MPEGDASH} onChange={this.MPEGDASHChange} type="checkbox"/>MPEG-DASH
                      </label>
                      <br/>
                      
                      <br/>
                      <h4> 3. Select a contract term in years.</h4>
                      <select name="contract_term" value={this.state.contractTerm} onChange={this.contractTermChange} className="selectpicker" id="contract_term" required title="Choose one of the following...">
                          <option id="contract_term_1">1</option>
                          <option id="contract_term_2">2</option>
                          <option selected id="contract_term_3">3</option>
                      </select>
                      <h4> 4. Enter the number of streams you need each year.</h4>
                          <input name="year_one_channels" onChange={this.yearOneChannelsChange} value={this.state.yearOneChannels} type="number" min="1" step="1" id="year_one_channels" className="form-control" required placeholder="Channels in Year 1"></input>
                          <input name="year_two_channels" onChange={this.yearTwoChannelsChange} value={this.state.yearTwoChannels} type="number" min="1" step="1" id="year_two_channels" className="form-control"  required placeholder="Channels in Year 2"></input>
                          <input name="year_three_channels" onChange={this.yearThreeChannelsChange} value={this.state.yearThreeChannels} type="number" min="1" step="1" id="year_three_channels" className="form-control" required placeholder="Channels in Year 3"></input>
                      <h4> 5. Select a support plan for your services.</h4>
                      <div className="radio">
                          <ul>
                              <label><input onChange={this.supportPlanChange} type="radio" name="gold" checked value="Gold"/>Gold</label>
                              <label><input onChange={this.supportPlanChange} type="radio" name="platinum" value="Platinum"/>Platinum</label>
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