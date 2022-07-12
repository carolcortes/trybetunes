import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteCheck: false,
    };
  }

  componentDidMount() {
    this.checkFavoritesSongs();
  }

  checkFavoritesSongs = async () => {
    const { favoritesList, trackId } = this.props;
    this.setState({
      favoriteCheck: favoritesList.some((favorite) => favorite.trackId === trackId),
    });
  }

  handleFavoriteSong = async ({ target }) => {
    const { trackName, previewUrl, trackId } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong({ trackName, previewUrl, trackId });
      this.setState({ loading: false, favoriteCheck: true });
    } else {
      await removeSong({ trackName, previewUrl, trackId });
      this.setState({ loading: false, favoriteCheck: false });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoriteCheck } = this.state;
    return (
      <div>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            name={ trackId }
            onChange={ this.handleFavoriteSong }
            checked={ favoriteCheck }
          />
        </label>
        { loading && <p>Carregando...</p> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
