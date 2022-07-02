import React from 'react';
import Content from './Content';
import Header from './Header';
import Navigation from './Navigation';

class UsersPage extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Navigation />
        <Content />
      </>
    );
  }
}

export default UsersPage;
