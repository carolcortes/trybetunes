import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      searchInput: '',
    };
  }

  validateButton = () => {
    const { searchInput } = this.state;
    const minLength = 2;
    this.setState({
      isButtonDisabled: (searchInput.length < minLength),
    });
  }

  handleInputChange = ({ target }) => {
    this.setState({
      searchInput: target.value,
    }, this.validateButton);
  }

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <form onSubmit={ () => {} }>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleInputChange }
          />
          <button
            type="button"
            onClick={ () => {} }
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
