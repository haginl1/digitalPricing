import React from 'react';
import ReactDOM from 'react-dom';
import Encompass from "./pages/Encompass.js";
import { Route, HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Route path='/' component={Encompass}/>
  </HashRouter>
, document.getElementById('root'));
