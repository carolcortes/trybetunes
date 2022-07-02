import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UsersPage from './components/UsersPage';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <UsersPage />
        </Switch>
      </div>
    );
  }
}

export default App;
