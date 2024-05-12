import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Album from '../../pages/Album';
import Favorites from '../../pages/Favorites';
import Profile from '../../pages/Profile';
import ProfileEdit from '../../pages/ProfileEdit';
import Search from '../../pages/Search';
import './styles.css';

class MainRoutes extends React.Component {
  render() {
    return (
      <div className="main-routes">
        <Sidebar />
        <main className="main-routes_content">
          <Switch>
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
          </Switch>
        </main>
      </div>
    );
  }
}

export default MainRoutes;
