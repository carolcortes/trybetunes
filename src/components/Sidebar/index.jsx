import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { LuStar } from 'react-icons/lu';
import { FaRegCircleUser } from 'react-icons/fa6';
import Logo from '../../assets/logo.png';
import DefaultAvatar from '../../assets/default_avatar.png';
import { getUser } from '../../services/userAPI';

import './styles.css';

class Sidebar extends React.Component {
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
  };

  render() {
    const { loading, userName } = this.state;
    return (
      <div data-testid="sidebar-component" className="sidebar">
        <img src={ Logo } alt="Trybetunes logo" className="sidebar_logo" />
        <nav className="sidebar_navigation">
          <NavLink data-testid="link-to-search" to="/search">
            <IoSearchOutline />
            <p>Pesquisar</p>
          </NavLink>
          <NavLink data-testid="link-to-favorites" to="/favorites">
            <LuStar />
            <p>Favoritas</p>
          </NavLink>
          <NavLink data-testid="link-to-profile" to="/profile">
            <FaRegCircleUser />
            <p>Perfil</p>
          </NavLink>
        </nav>
        <div className="sidebar_user">
          <img src={ DefaultAvatar } alt="User Avatar" className="sidebar_user-avatar" />
          <p data-testid="sidebar-user-name" className="sidebar_user-name">
            {loading ? 'Carregando...' : userName}
          </p>
        </div>
      </div>
    );
  }
}

export default Sidebar;
