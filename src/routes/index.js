import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import Clientes from '../pages/Clientes';
import Cliente from '../pages/Editar/cliente';

import Produtos from '../pages/Produtos';
import Produto from '../pages/Editar/produto';

import Servicos from '../pages/Servicos';
import Servico from '../pages/Editar/servico';


export default function Routes(){
  return(
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
      
      <Route exact path="/clientes" component={Clientes} isPrivate />
      <Route exact path="/clientes/:id" component={Cliente} isPrivate />
      
      <Route exact path="/produtos" component={Produtos} isPrivate />
      <Route exact path="/produtos/:id" component={Produto} isPrivate />
      
      <Route exact path="/servicos" component={Servicos} isPrivate />
      <Route exact path="/servicos/:id" component={Servico} isPrivate />
    </Switch>
  )
}