import React from 'react';

export default class QuoteHistory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {quotes:["hello this is quotes"]}
		// this.getQuotes = this.getQuotes.bind(this)
	}

	componentDidMount() {
		this.getQuotes()
	}

	getQuotes() {
		  axios.get('/api/quotes')
			// console.log(this.state.quotes)
      .then(function (response) {
        this.setState({quotes: response.data})
      }.bind(this))
      .catch(function (error) {
        console.log(error);
        this.setState({quotes: []})
      });
	}

	renderEachQuote() {
		if (this.state.quotes === []) {
			return
		}
		else {
			var list = this.state.quotes.map(function(row, index){
				return (
					<tr key={row.id}>
				 		<td>{row.date}</td>
						<td>{row.company}</td>
						<td>{row.description}</td>
						<td>
								<button className="btn btn-default" type="submit">View 
								</button>
						
						</td>
					</tr>
				)
				// return (<td>hello</td>)

			}.bind(this))
			return <tbody>{list}</tbody>	   
		}
	}

  render() {
    return (
    <div>
		<div className="panel panel-primary">
			<div className="panel-heading ">
				<h3 className="panel-title text-warning pull-left">Quote History</h3>
				<div className="clearfix"></div>
			</div>
			<div className="panel-body" id="accordion">
				<table id="myTable"className="table table-striped table-hover">
					<thead>
						<tr>
							<th><button type="button" className="btn btn-xs btn-default" id="name-btn">Date</button></th>
							<th><button type="button" className="btn btn-xs btn-default" id="style-btn">Company</button></th>
							<th><button type="button" className="btn btn-xs btn-default" id="rating-btn">Description</button></th>
							<th><button type="button" className="btn btn-xs btn-default" id="abv-btn">Quotes</button></th>
						</tr>
					</thead>					
							{this.renderEachQuote()}
				</table>
			</div>
		</div>
    </div>
    );
  }
}