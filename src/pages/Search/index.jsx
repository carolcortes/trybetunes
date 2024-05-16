import React from 'react';
import SearchResult from '../../components/SearchResult';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import './styles.css';

class Search extends React.Component {
  constructor() {
    super();
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

  handleSearchButton = (event) => {
    event.preventDefault();
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
  }

  render() {
    const { isButtonDisabled, loading, artist, searchInput, searchResult } = this.state;
    return (
      <div data-testid="page-search" className="page-search">
        <form onSubmit={ this.handleSearchButton } className="page-search_form">
          <input
            className="page-search_input"
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleInputChange }
            value={ searchInput }
            placeholder="Digite sua pesquisa"
          />
          <button
            type="button"
            onClick={ this.handleSearchButton }
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            className="page-search_button"
            title={ isButtonDisabled ? 'Digite sua pesquisa' : 'Pesquisar álbum' }
          >
            Pesquisar
          </button>
        </form>
        <div className="page-search_result">
          { loading && <p>Carregando...</p>}
          { artist && !loading && (
            <div>
              <p className="page-search_result-info">
                Resultados para
                { ' ' }
                { `"${artist}"` }
              </p>
              <SearchResult albums={ searchResult } />
            </div>)}
        </div>
      </div>
    );
  }
}

export default Search;
