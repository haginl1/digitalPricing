import React from 'react';
import { NavLink, Switch } from "react-router-dom";
import QuoteHistoryRow from "./QuoteHistoryRow.js"

export default class QuoteHistory extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {quotes:["hello this is quotes"]}
        this.getQuotes = this.getQuotes.bind(this)
    }

    componentDidMount(props) {
        this.getQuotes()
    }

    getQuotes(props) {
        axios.get('/api/quotes/' + this.props.userID)
        .then(function (response) {
        this.setState({quotes: response.data})
        }.bind(this))
        .catch(function (error) {
        this.setState({quotes: []})
        });
    }

    renderEachQuote() {
        $(document).ready(function(){
            $('#myTable').dataTable();
        });
        if (this.state.quotes === []) {
            return
        }
        else {
            var list = this.state.quotes.map(function(row, index){
                return (
                    <QuoteHistoryRow key={index} quote={row} setCurrentQuote={this.props.setCurrentQuote}/>
                )
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
                    <NavLink to={'/quote'}>
                        <button
                            type="button"
                            className="btn btn-default new-quote pull-right">
                              New Quote
                        </button>
                    </NavLink>
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
