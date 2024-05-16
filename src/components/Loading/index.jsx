import React from 'react';
import './styles.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <div className="loading_container">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <p className="loading_title">Carregando...</p>
      </div>
    );
  }
}

export default Loading;
