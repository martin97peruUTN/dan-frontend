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
import ListadoPedidos from './pages/ListadoPedidos'
import RegistrarObra from './pages/RegistrarObra'
import RegistrarMaterial from './pages/RegistrarMaterial'
import RegistrarPedido from './pages/RegistrarPedido'
import RegistrarPago from "./pages/RegistrarPago";

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
            <Route exact path="/cliente" component={RegistrarCliente} />
            <Route exact path="/cliente-listado" component={ListadoClientes} />
            <Route exact path="/obra" component={RegistrarObra} />
            <Route exact path="/producto" component={RegistrarMaterial} />
            <Route exact path="/pedido" component={RegistrarPedido} />
            <Route exact path="/pedido-listado" component={ListadoPedidos} />
            <Route exact path="/pago" component={RegistrarPago} />

            <Route path="/pedido/:pedidoId" component={RegistrarPedido} />

            {/*Por defecto*/}
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;
