import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Logo from '../../assets/logo.png';
import BackgroundPatterns from '../../assets/background_patterns.png';
import './styles.css';
import Loading from '../../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      userName: '',
      loading: false,
      redirect: false,
    };
  }

  validateButton = () => {
    const { userName } = this.state;
    const minLength = 3;
    this.setState({
      isButtonDisabled: userName.length < minLength,
    });
  };

  handleInputChange = ({ target }) => {
    this.setState(
      {
        userName: target.value,
      },
      this.validateButton,
    );
  };

  handleButtonClick = async () => {
    this.setState({ loading: true });
    const { userName } = this.state;
    await createUser({ name: userName });
    this.setState({ loading: false }, () => this.setState({ redirect: true }));
  };

  render() {
    const { isButtonDisabled, loading, redirect } = this.state;
    return (
      <div data-testid="page-login" className="page-login">
        { !loading && (
          <div className="page-login_container">
            <img className="page-login_logo" src={ Logo } alt="Trybetunes logo" />
            <form className="page-login_form" onSubmit={ this.handleButtonClick }>
              <label htmlFor="userName">
                <input
                  type="text"
                  data-testid="login-name-input"
                  placeholder="qual é o seu nome?"
                  name="userName"
                  onChange={ this.handleInputChange }
                  className="page-login_user-name"
                />
              </label>
              <button
                type="button"
                onClick={ this.handleButtonClick }
                data-testid="login-submit-button"
                disabled={ isButtonDisabled }
                className="page-login_login-button"
              >
                Entrar
              </button>
            </form>
          </div>
        ) }
        <img
          src={ BackgroundPatterns }
          className="page-login_background-patterns"
          alt="Background Patterns"
        />

        {loading && <Loading />}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
