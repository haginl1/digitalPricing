import React from 'react';
import ReactDOM from 'react-dom';
import Layout from "./Main/Layout.js";
import { Route, HashRouter } from "react-router-dom";


ReactDOM.render(
  <HashRouter>
    <Route path='/' component={Layout}/>
  </HashRouter>
, document.getElementById('root'));

