import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../../components/Loading';
import './styles.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: '',
      loading: true,
      favoritesList: [],
    };
  }

  componentDidMount() {
    this.getMusicList();
  }

  getMusicList = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const musicList = await getMusics(id);
    const favoriteData = await getFavoriteSongs();
    this.setState({ favoritesList: favoriteData });
    this.setState({ musicList, loading: false });
  };

  render() {
    const { musicList, loading, favoritesList } = this.state;
    return (
      <div
        data-testid="page-album"
        className={ `page-album ${loading ? 'loading' : ''} ` }
        // className="page_album"
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="page-album_container">
            <div className="page-album_header">
              <img
                src={ musicList[0].artworkUrl100 }
                alt="Album"
                className="page-album_header-image"
              />
              <div className="page-album_header-container">
                <h1 data-testid="album-name" className="page-album_header-name">
                  {musicList[0].collectionName}
                </h1>
                <h2 data-testid="artist-name" className="page-album_header-artist">
                  {musicList[0].artistName}
                </h2>
              </div>
            </div>
            <div className="page-album_tracks-list">
              {musicList
                .filter((music) => music.kind === 'song')
                .map(({ trackId, trackName, previewUrl }) => (
                  <MusicCard
                    key={ trackId }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                    favoritesList={ favoritesList }
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
