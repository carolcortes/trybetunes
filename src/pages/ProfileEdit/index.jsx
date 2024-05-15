import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import DefaultAvatar from '../../assets/default_avatar.png';
import './styles.css';

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
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateButton());
  };

  handleButtonClick = async (event) => {
    event.preventDefault();
    console.log(event);
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    this.setState({ loading: true }, async () => {});
    await updateUser({ name, email, image, description });
    history.push('/profile');
  };

  validateButton = () => {
    const { name, email } = this.state;
    if (
      name === ''
      || !email?.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    ) {
      this.setState({ disableButton: true });
    } else {
      this.setState({ disableButton: false });
    }
  };

  render() {
    const { name, email, image, description, loading, disableButton } = this.state;
    return (
      <div
        data-testid="page-profile-edit"
        className={ `page-profile-edit ${loading ? 'loading' : ''}` }
      >
        {loading ? (
          <Loading />
        ) : (
          <form
            onSubmit={ this.handleButtonClick }
            className="page-profile-edit_container"
          >
            <div className="page-profile-edit_header">
              <div className="page-profile-edit_user-image_container">
                <img
                  src={ image || DefaultAvatar }
                  alt={ `Foto de ${name}` }
                  name="image"
                  className="page-profile-edit_user-image"
                />
                <input
                  type="text"
                  name="image"
                  data-testid="edit-input-image"
                  value={ image }
                  onChange={ this.handleInputChange }
                  className="page-profile-edit_image-input"
                  placeholder="Insira um link para seu avatar"
                />
              </div>
            </div>
            <div className="page-profile-edit_content">
              <div className="page-profile-edit_data-column">
                <h4>Nome</h4>
                <p>Fique à vontade para usar seu nome social</p>
                <TextField
                  id="standard-name-input"
                  type="text"
                  variant="standard"
                  value={ name }
                  data-testid="edit-input-name"
                  name="name"
                  onChange={ this.handleInputChange }
                  placeholder="Seu nome"
                />
              </div>
              <div className="page-profile-edit_data-column">
                <h4>E-mail</h4>
                <p>Escolha um e-mail que consulte diariamente</p>
                <TextField
                  id="standard-email-input"
                  type="email"
                  variant="standard"
                  value={ email }
                  data-testid="edit-input-email"
                  name="email"
                  onChange={ this.handleInputChange }
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="page-profile-edit_data-column description">
                <h4>Descrição</h4>
                <TextField
                  id="standard-description-input"
                  multiline
                  variant="standard"
                  rows={ 6 }
                  value={ description }
                  data-testid="edit-input-description"
                  name="description"
                  onChange={ this.handleInputChange }
                  placeholder="Sobre mim"
                />
              </div>
              <button
                type="submit"
                data-testid="edit-button-save"
                disabled={ disableButton }
                className="page-profile-edit_save-button"
              >
                Salvar
              </button>

            </div>
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
