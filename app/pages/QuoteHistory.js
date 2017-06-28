import React from 'react';

export default class QuoteHistory extends React.Component {
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
					<tbody>
						<h2>Quotes Table</h2>
					</tbody>
				</table>
			</div>
		</div>
    </div>
    );
  }
}