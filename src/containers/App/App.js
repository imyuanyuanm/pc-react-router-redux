import React, { Component } from 'react';
import Routes from '../../routes';
import './App.scss';

export class App extends Component {
  render() {
    return (
      <div className="App">
        {Routes(this.props)}
      </div>
    );
  }
}