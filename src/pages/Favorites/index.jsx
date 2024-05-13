import React from 'react';
import MusicCard from '../../components/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import './styles.css';
import Loading from '../../components/Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesList: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getFavoritesList();
  }

  getFavoritesList = async () => {
    this.setState({ loading: true });
    const favoriteData = await getFavoriteSongs();
    this.setState({ favoritesList: favoriteData, loading: false });
  };

  render() {
    const { favoritesList, loading } = this.state;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        <div className="page-favorites_header">
          <h1 className="page-favorites_title">Músicas Favoritas</h1>
        </div>
        <div className={ `page-favorites_content ${loading ? 'loading' : ''}` }>
          {loading ? (
            <Loading />
          ) : (
            <div className="page-favorites_tracks-list">
              {favoritesList.map(({ trackName, previewUrl, trackId }) => (
                <MusicCard
                  key={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  trackId={ trackId }
                  favoritesList={ favoritesList }
                  getFavoritesList={ this.getFavoritesList }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
