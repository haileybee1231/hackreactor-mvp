import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Guitar from '../src/components/Guitar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chord: [
        {
          string: 'E',
          fret: 0
        },
        {
          string: 'A',
          fret: 0
        },
        {
          string: 'D',
          fret: 0
        },
        {
          string: 'G',
          fret: 0
        },
        {
          string: 'B',
          fret: 0
        },
        {
          string: 'e',
          fret: 0
        },
      ]
    }
  }

  setNote(selectedFret, selectedString) {
    console.log(selectedFret, selectedString)
    this.state.chord.forEach(string => {
      if (string.string === selectedString) {
        string.fret = selectedFret;
      }
    })
    console.log(this.state.chord);
    // this.setState({
    //
    // })
  }

  render () {
    return (<div>
      <h1>Guitar Chord Finder</h1>
      <Guitar setNote={this.setNote.bind(this)} chord={this.state.chord}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
