import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//Prime React
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import PrimeReact from 'primereact/api';

import Navbar from './components/Navbar'
import PageNotFound from './components/pages/PageNotFound'
import RegistrarCliente from './components/pages/RegistrarCliente'
import ListadoClientes from './components/pages/ListadoClientes'

function App() {

  PrimeReact.ripple = true;

  return (
    <Router>
      <div className="App">
        <Navbar className="navbar"/>
        <Switch>
          <Route exact path="/" component={PageNotFound} />
          {/*Pongo el exact porque sino la / machea con el resto tambien*/}
          <Route path="/cliente-nuevo" component={RegistrarCliente} />
          <Route path="/cliente-listado" component={ListadoClientes} />
          {
          /*<Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/posts/:post_id" component={Post} />
          <Route path="/redux" component={App2} />*/
          }
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
