import React from 'react';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userData = await getUser();
    this.setState({ userInfo: userData });
  }

  render() {
    const { userInfo: { name, email, image, description } } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <form onSubmit={ () => {} }>
          <img src={ image } alt={ `Foto de ${name}` } />
          <input type="text" data-testid="edit-input-image" />
          <input
            type="text"
            data-testid="edit-input-name"
            value={ name }
          />
          <input
            type="email"
            data-testid="edit-input-email"
            value={ email }
          />
          <textarea
            cols="30"
            rows="10"
            data-testid="edit-input-description"
            value={ description }
          />
          <button type="button" onClick={ () => {} }>Salvar</button>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
