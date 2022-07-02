import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';

class Content extends React.Component {
  render() {
    return (
      <main className="content">
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default Content;
