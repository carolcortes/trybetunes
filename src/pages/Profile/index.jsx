import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import DefaultAvatar from '../../assets/default_avatar.png';
import './styles.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userData = await getUser();
    this.setState({ userInfo: userData }, this.setState({ loading: false }));
  };

  render() {
    const {
      loading,
      userInfo: { name, email, image, description },
    } = this.state;
    return (
      <div
        data-testid="page-profile"
        className={ `page-profile ${loading ? 'loading' : ''}` }
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="page-profile_container">
            <div className="page-profile_header">
              <img
                className="page-profile_user-image"
                data-testid="profile-image"
                src={ image || DefaultAvatar }
                alt={ `Foto de ${name}` }
              />
            </div>
            <div className="page-profile_content">
              <div className="page-profile_data-column">
                <h4>Nome</h4>
                <p>{name}</p>
              </div>
              <div className="page-profile_data-column">
                <h4 className="page-profile_data-title">E-mail</h4>
                {email ? (
                  <p className="data-email">{email}</p>
                ) : (
                  <p className="page-profile_no-data">Não há e-mail cadastrado</p>
                )}
              </div>
              <div className="page-profile_data-column">
                <h4>Descrição</h4>
                {description ? (
                  <p className="data-description">{description}</p>
                ) : (
                  <p className="page-profile_no-data">Nos conte sobre você</p>
                )}
              </div>
              <Link className="page-profile_edit-button" to="/profile/edit">
                Editar perfil
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
