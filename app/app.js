import React from 'react';
import ReactDOM from 'react-dom';
import Layout from "./pages/Layout.js";
import { Route, HashRouter } from "react-router-dom";
import $ from 'jquery';


ReactDOM.render(
  <HashRouter>
    <Route path='/' component={Layout}/>
  </HashRouter>
, document.getElementById('root'));

