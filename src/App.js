import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import MainRoutes from './components/MainRoutes/MainRoutes';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/" component={ MainRoutes } />
        </Switch>
      </div>
    );
  }
}

export default App;
