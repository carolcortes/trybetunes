import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
  }

  render() {
    const { loading, userInfo: { name, email, image, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <h1>Profile</h1>
        { loading ? <p>Carregando...</p>
          : (
            <div>
              <img data-testid="profile-image" src={ image } alt={ `Foto de ${name}` } />
              <h4>{ name }</h4>
              <p>{ email }</p>
              <p>{ description }</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
