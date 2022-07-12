import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: true,
      disableButton: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userData = await getUser();
    const { name, email, image, description } = userData;
    this.setState({
      name,
      email,
      image,
      description,
      loading: false,
    });
    this.validateButton();
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateButton());
  }

  handleButtonClick = async () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    this.setState({ loading: true }, async () => {});
    await updateUser({ name, email, image, description });
    history.push('/profile');
    // this.setState({ redirect: true });
  }

  validateButton = () => {
    const { name, email, description, image } = this.state;
    if (name === '' || description === ''
      || image === '' || !email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      this.setState({ disableButton: true });
    } else {
      this.setState({ disableButton: false });
    }
  }

  render() {
    const { name, email, image, description,
      loading, disableButton } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {/* { redirect && <Redirect to="/profile" /> } */}
        { loading ? <p>Carregando...</p>
          : (
            <form onSubmit={ this.handleButtonClick }>
              <img
                src={ image }
                alt={ `Foto de ${name}` }
                name="image"
              />
              <input
                type="text"
                name="image"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.handleInputChange }
              />
              <input
                type="text"
                data-testid="edit-input-name"
                value={ name }
                name="name"
                onChange={ this.handleInputChange }
              />
              <input
                type="email"
                name="email"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.handleInputChange }
              />
              <textarea
                name="description"
                cols="30"
                rows="10"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleInputChange }
              />
              <button
                type="button"
                onClick={ this.handleButtonClick }
                data-testid="edit-button-save"
                disabled={ disableButton }
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
}.isRequired;

export default ProfileEdit;
