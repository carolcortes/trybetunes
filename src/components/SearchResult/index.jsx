import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.css';

class SearchResult extends React.Component {
  render() {
    const { albums } = this.props;
    return (
      <div className="search-result">
        { albums.length === 0
          ? (<p className="search-result_error">Nenhum álbum foi encontrado :(</p>)
          : (
            <div className="search-result_album-container">
              { albums.map((album) => (
                <div key={ album.collectionId } className="search-result_album">
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                    className="search-result_album-link"
                  >
                    <img
                      className="search-result_album-image"
                      src={ album.artworkUrl100 }
                      alt={ album.collectionName }
                    />
                    <p className="search-result_album-name">{ album.collectionName }</p>
                  </Link>
                  <h3 className="search-result_album-artist">{ album.artistName }</h3>
                </div>
              )) }
            </div>
          ) }
      </div>
    );
  }
}

SearchResult.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchResult;
