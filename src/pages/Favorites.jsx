import React from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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

  // componentDidUpdate() {
  //   if () this.getFavoritesList();
  // }

  // componentWillUnmount() {
  //   this.unmonted = true;
  // }

  getFavoritesList = async () => {
    this.setState({ loading: true });
    const favoriteData = await getFavoriteSongs();
    this.setState({ favoritesList: favoriteData, loading: false });
  }

  setLoading = () => {
    this.setState((prevState) => ({ loading: !prevState.loading }));
  }

  render() {
    const { favoritesList, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <h1>Músicas Favoritas:</h1>
        {/* { loading && <h1>Carregando...</h1> } */}
        { loading ? <h1>Carregando...</h1>
          : (
            <div>
              { favoritesList.map(({ trackName, previewUrl, trackId }) => (
                <MusicCard
                  key={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  trackId={ trackId }
                  favoritesList={ favoritesList }
                  getFavoritesList={ this.getFavoritesList }
                />
              )) }
            </div>)}
      </div>
    );
  }
}

export default Favorites;
