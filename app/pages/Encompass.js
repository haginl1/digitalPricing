import React from 'react';
import { Route, Switch } from "react-router-dom";
import QuoteHistory from "./QuoteHistory.js";
import NewQuote from "./NewQuote.js";
import NotFound from "./404.js";
import Contact from "./Contact.js";
import Nav from "../components/Layout/Nav.js";
import Footer from "../components/Layout/Footer.js";
import QuoteDetails from "./QuoteDetails.js"

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:"",
            currentQuote:""
    }
    this.setCurrentQuote = this.setCurrentQuote.bind(this)
}

  componentWillMount() {
        const jquery = document.createElement("script");
        jquery.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
        jquery.async = true;
        document.body.appendChild(jquery);
        
        const jqueryDatatable = document.createElement("script");
        jqueryDatatable.src = "https://cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js";
        jqueryDatatable.async = true;
        document.body.appendChild(jqueryDatatable);

        const bootstrap = document.createElement("script");
        bootstrap.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";
        bootstrap.async = true;
        document.body.appendChild(bootstrap);

        const fontAwesome = document.createElement("script");
        fontAwesome.src = "https://use.fontawesome.com/ab00cd5dc1.js";
        fontAwesome.async = true;
        document.head.appendChild(fontAwesome);

        const axios = document.createElement("script");
        axios.src = "https://unpkg.com/axios/dist/axios.min.js";
        axios.async = true;
        document.head.appendChild(axios);

        const quote = document.createElement("script");
        quote.src = "https://quote-builder.herokuapp.com/assets/js/quote.js";
        quote.async = true;
        document.head.appendChild(quote);

        const bootstrapCSS = document.createElement("link");
        bootstrapCSS.rel = "stylesheet"
        bootstrapCSS.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        bootstrapCSS.async = true;
        document.head.appendChild(bootstrapCSS);

        const jQueryDataTablesCSS = document.createElement("link");
        jQueryDataTablesCSS.rel = "stylesheet"
        jQueryDataTablesCSS.href = "https://cdn.datatables.net/1.10.2/css/jquery.dataTables.min.css"
        jQueryDataTablesCSS.async = true;
        document.head.appendChild(jQueryDataTablesCSS);

        const internalStyles = document.createElement("link");
        internalStyles.rel = "stylesheet"
        internalStyles.href = "https://quote-builder.herokuapp.com/assets/css/style.css"
        internalStyles.async = true;
        document.head.appendChild(internalStyles);
     
    }

    setCurrentQuote(row) {
        this.setState({currentQuote: row})
    }

    render() {
        const { location } = this.props;
        return (
            <div>
                <Route exact path='/' render={routeProps => <NewQuote {...routeProps} embedded={true} setCurrentQuote={this.setCurrentQuote} currentQuote={this.state.currentQuote}/>} />
            </div>
        );
    }
}