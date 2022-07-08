import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getMusicList();
  }

  getMusicList = async () => {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    this.setState({ musicList, loading: false });
    // console.log(this.state.musicList);
  }

  render() {
    const { musicList, loading } = this.state;
    return (
      <div data-testid="page-album">
        { loading ? <p>Carregando...</p>
          : (
            <div>
              <h1 data-testid="album-name">{musicList[0].collectionName}</h1>
              <h2 data-testid="artist-name">{musicList[0].artistName}</h2>
              { musicList.filter((music) => music.kind === 'song')
                .map(({ trackId, trackName, previewUrl }) => (
                  <MusicCard
                    key={ trackId }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                  />
                )) }
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
