import React; from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Adicionar from './Pages/Adicionar';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Adicionar} />
      </Switch>
    </BrowserRouter>
  );
}

