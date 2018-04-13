import React, { Component } from 'react';
import './App.css';
import Container from './components/Container'

class App extends Component {
  constructor(){
    super()
    // this.state = {
    //   mouseX: '0px',
    //   mouseY: '0px'
    // }
  }

  render() {
    return (
      <div  className="App">
        <Container />
      </div>
    );
  }
}

export default App;
