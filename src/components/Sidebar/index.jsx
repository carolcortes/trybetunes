import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { LuStar } from 'react-icons/lu';
import { FaRegCircleUser } from 'react-icons/fa6';
import ReactLoading from 'react-loading';
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
      userImage: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const userInfo = await getUser();
    this.setState(
      { userName: userInfo.name, userImage: userInfo.image },
      this.setState({ loading: false }),
    );
  };

  render() {
    const { loading, userName, userImage } = this.state;
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
          {!loading && (
            <img
              src={ userImage || DefaultAvatar }
              alt="User Avatar"
              className="sidebar_user-avatar"
            />
          )}

          <div data-testid="sidebar-user-name" className="sidebar_user-name">
            {loading ? (
              <ReactLoading type="bars" height="32px" width="32px" color="#003be5" />
            ) : (
              <p>{userName}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
