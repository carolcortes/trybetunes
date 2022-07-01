import React from 'react';
import { createUser, getUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      userName: '',
      // loading: false,
    };
  }

  validateButton = () => {
    const { userName } = this.state;
    const minLength = 3;
    this.setState({
      isButtonDisabled: (userName.length < minLength),
    });
  }

  handleInput = ({ target }) => {
    this.setState({
      userName: target.value,
    }, this.validateButton);
  }

  handleButtonClick = async () => {
    const { userName } = this.state;
    await createUser({ name: userName });
    console.log(await getUser());
  }

  render() {
    const { isButtonDisabled } = this.state;
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
              onChange={ this.handleInput }
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
      </div>
    );
  }
}

export default Login;
