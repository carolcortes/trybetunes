import React from 'react';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <h1>
          Album
          {/* {' '}
          {this.props.match.params.id} */}
        </h1>
      </div>
    );
  }
}

export default Album;
