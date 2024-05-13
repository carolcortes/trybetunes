import React from 'react';
import PropTypes from 'prop-types';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import ReactLoading from 'react-loading';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import './styles.css';

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
  };

  handleFavoriteSong = async ({ target }) => {
    const { trackName, previewUrl, trackId, getFavoritesList } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong({ trackName, previewUrl, trackId });
      this.setState({ loading: false, favoriteCheck: true });
    } else {
      await removeSong({ trackName, previewUrl, trackId });
      this.setState({ loading: false, favoriteCheck: false });
      if (getFavoritesList) getFavoritesList();
    }
  };

  renderFavoriteIcon = () => {
    const { favoriteCheck } = this.state;
    return favoriteCheck ? <GoHeartFill /> : <GoHeart />;
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoriteCheck } = this.state;
    return (
      <div className="music-card">
        <div className="music-card_container">
          <h4 className="music-card_track-name">{trackName}</h4>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
            className="music-card_audio-player"
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label
            htmlFor={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            className={ `music-card_favorite-label ${favoriteCheck ? 'checked' : ''}` }
          >
            {loading ? (
              <ReactLoading type="bars" height="34px" width="34px" color="#ec5050" />
            ) : (
              this.renderFavoriteIcon()
            )}
            {}
            <input
              type="checkbox"
              id={ trackId }
              name={ trackId }
              onChange={ this.handleFavoriteSong }
              checked={ favoriteCheck }
              className="music-card_favorite-input"
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
