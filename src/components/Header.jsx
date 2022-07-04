import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const userInfo = await getUser();
    this.setState({ userName: userInfo.name }, this.setState({ loading: false }));
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <p data-testid="header-user-name">{ loading ? 'Carregando...' : userName }</p>
        <nav>
          <NavLink data-testid="link-to-search" to="/search">Pesquisar</NavLink>
          <NavLink data-testid="link-to-favorites" to="/favorites">Favoritas</NavLink>
          <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
