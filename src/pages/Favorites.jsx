import React from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesList: [],
    };
  }

  componentDidMount() {
    if (!this.unmonted) this.getFavoritesList();
  }

  componentDidUpdate() {
    if (!this.unmonted) this.getFavoritesList();
  }

  componentWillUnmount() {
    this.unmonted = true;
  }

  getFavoritesList = async () => {
    const favoriteData = await getFavoriteSongs();
    this.setState({ favoritesList: favoriteData });
  }

  render() {
    const { favoritesList } = this.state;
    return (
      <div data-testid="page-favorites">
        <h1>Músicas Favoritas:</h1>
        { favoritesList.map(({ trackName, previewUrl, trackId }) => (
          <MusicCard
            key={ trackId }
            trackName={ trackName }
            previewUrl={ previewUrl }
            trackId={ trackId }
            favoritesList={ favoritesList }
          />
        )) }
      </div>
    );
  }
}

export default Favorites;
