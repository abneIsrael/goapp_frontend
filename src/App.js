import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; //Importa a Biblioteca de Rotas mais usada no React

//Importa seus componentes
import Login from './pages/Login';
import Timeline from './pages/Timeline';

class App extends Component { //componentes do React, sao Classes que estende a classe Componentes
  render() { //metodo obrigatorio, que indica qual conteudo Html o React deve renderizar na tela quando esse componente for chamado
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/timeline" component={Timeline} />
        </Switch>
      </BrowserRouter> 
    );
  }
}

export default App;
