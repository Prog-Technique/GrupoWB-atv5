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

import AddProdutos from '../pages/Add/produto';
import AddServicos from '../pages/Add/servico';

import Genero from '../pages/Listagens/genero';
import SPGenero from '../pages/Listagens/ser_pro_Genero';
import Geral from '../pages/Listagens/geral_ser_pro';
import CincoValor from '../pages/Listagens/5valor';
import DezMais from '../pages/Listagens/10mais';
import DezMenos from '../pages/Listagens/10menos';


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

      <Route exact path="/adicionar_produtos/:id" component={AddProdutos} isPrivate />
      <Route exact path="/adicionar_servicos/:id" component={AddServicos} isPrivate />

      <Route exact path="/genero" component={Genero} isPrivate />
      <Route exact path="/ser_pro_genero" component={SPGenero} isPrivate />
      <Route exact path="/geral" component={Geral} isPrivate />
      <Route exact path="/5valor" component={CincoValor} isPrivate />
      <Route exact path="/10mais" component={DezMais} isPrivate />
      <Route exact path="/10menos" component={DezMenos} isPrivate />
    
    </Switch>
  )
}