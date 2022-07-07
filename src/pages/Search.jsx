import React from 'react';
import SearchResult from '../components/SearchResult';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    // this.searchResult = '';
    this.state = {
      isButtonDisabled: true,
      searchInput: '',
      artist: '',
      loading: false,
      searchResult: [],
    };
  }

  validateSearchButton = () => {
    const { searchInput } = this.state;
    const minLength = 2;
    this.setState({
      isButtonDisabled: (searchInput.length < minLength),
    });
  }

  handleInputChange = ({ target }) => {
    this.setState({
      searchInput: target.value,
    }, this.validateSearchButton);
  }

  handleSearchButton = () => {
    const { searchInput } = this.state;
    this.setState({
      loading: true,
      artist: searchInput,
      isButtonDisabled: true,
      searchInput: '',
    }, async () => this.setState(
      { loading: false,
        searchResult: await searchAlbumsAPI(searchInput) },
    ));
    // this.searchResult = await searchAlbumsAPI(searchInput);
  }

  render() {
    const { isButtonDisabled, loading, artist, searchInput, searchResult } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <form onSubmit={ this.handleSearchButton }>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleInputChange }
            value={ searchInput }
          />
          <button
            type="button"
            onClick={ this.handleSearchButton }
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
        { loading && <p>Carregando...</p>}
        { artist && !loading && (
          <div>
            <p>
              Resultado de álbuns de:
              { ' ' }
              { artist }
            </p>
            <SearchResult albums={ searchResult } />
          </div>)}
      </div>
    );
  }
}

export default Search;
