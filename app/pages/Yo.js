import React from 'react';
import { Route, Switch } from "react-router-dom";
import NewQuote from "./NewQuote.js";


export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <NewQuote />
      </div>
    );
  }
}