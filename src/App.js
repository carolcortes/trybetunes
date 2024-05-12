import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import MainRoutes from './components/MainRoutes/MainRoutes';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route component={ MainRoutes } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
