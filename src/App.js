import React, { Component } from 'react';
import Index from './components/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Festive cards</h1>
        </header>
        <Index />
      </div>
    );
  }
}

export default App;
