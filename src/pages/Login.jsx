import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

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
      isButtonDisabled: (userName.length < minLength),
    });
  }

  handleInputChange = ({ target }) => {
    this.setState({
      userName: target.value,
    }, this.validateButton);
  }

  handleButtonClick = async () => {
    this.setState({ loading: true });
    const { userName } = this.state;
    await createUser({ name: userName });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const { isButtonDisabled, loading, redirect } = this.state;
    return (
      <div data-testid="page-login" className="page-login">
        <h1>Login</h1>
        <form onSubmit={ this.handleButtonClick }>
          <label htmlFor="userName">
            <input
              type="text"
              data-testid="login-name-input"
              placeholder="Nome"
              className="userName"
              onChange={ this.handleInputChange }
              name="userName"
            />
          </label>
          <button
            type="button"
            onClick={ this.handleButtonClick }
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
          >
            Entrar
          </button>
        </form>
        { loading && <h3>Carregando...</h3> }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
