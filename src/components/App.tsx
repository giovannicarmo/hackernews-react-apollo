import React from 'react';
import { Route, Switch } from 'react-router';
import ROUTES from '../Routes';
import './../styles/App.css';
import Header from './Header';

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          {ROUTES.map((route) => (
            <Route exact path={route.path} component={route.component} />
          ))}
        </Switch>
      </div>
    </div>
  );
}

export default App;
