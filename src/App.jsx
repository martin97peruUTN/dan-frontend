import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//Prime React
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import PrimeReact from 'primereact/api';

import Navbar from './components/Navbar'
import Menubar from './components/Menubar'
import PageNotFound from './pages/PageNotFound'
import RegistrarCliente from './pages/RegistrarCliente'
import ListadoClientes from './pages/ListadoClientes'
import RegistrarObra from './pages/RegistrarObra'
import RegistrarMaterial from './pages/RegistrarMaterial'
import RegistrarPedido from './pages/RegistrarPedido'

function App() {

  PrimeReact.ripple = true;

  return (
    <Router>
      <div className="App">
        <Menubar className=""/>
        <div className="mx-1 my-3 sm:mx-6">
          <Switch>
            <Route exact path="/" component={PageNotFound} />
            {/*Pongo el exact porque sino la / machea con el resto tambien*/}
            <Route path="/cliente-nuevo" component={RegistrarCliente} />
            <Route path="/cliente-listado" component={ListadoClientes} />
            <Route path="/obra-nueva" component={RegistrarObra} />
            <Route path="/producto-nuevo" component={RegistrarMaterial} />
            <Route path="/pedido-nuevo" component={RegistrarPedido} />
            {/*Por defecto*/}
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;
