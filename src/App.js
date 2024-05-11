import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Content from './components/Content';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Content />
        </Switch>
      </div>
    );
  }
}

export default App;
