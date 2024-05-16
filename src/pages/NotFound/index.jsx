import React from 'react';
import BackgroundPatterns from '../../assets/background_patterns_2.png';
import './styles.css';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="page-not-found">
        <div className="page-not-found_container">
          <h1 className="page-not-found_title">Ops!</h1>
          <h4 className="page-not-found_description">
            A página que você está procurando não foi encontrada.
          </h4>
        </div>
        <img
          src={ BackgroundPatterns }
          className="page-not-found_background-pattern"
          alt="Background Patterns"
        />
      </div>
    );
  }
}

export default NotFound;
