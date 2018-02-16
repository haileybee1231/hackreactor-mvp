import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Guitar from '../src/components/Guitar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  render () {
    return (<div>
      <h1>Guitar Chord Finder</h1>
      <Guitar />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
