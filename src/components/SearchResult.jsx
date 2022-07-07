import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchResult extends React.Component {
  render() {
    const { albums } = this.props;
    return (
      <div>
        { albums.length === 0 ? <p>Nenhum álbum foi encontrado</p>
          : (
            <div>
              { albums.map((album) => (
                <div key={ album.collectionId }>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <p>{ album.collectionName }</p>
                  </Link>
                  <p>{ album.artistName }</p>
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
