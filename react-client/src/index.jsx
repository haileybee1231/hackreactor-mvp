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
          fret: 'o'
        },
        {
          string: 'A',
          fret: 'o'
        },
        {
          string: 'D',
          fret: 'o'
        },
        {
          string: 'G',
          fret: 'o'
        },
        {
          string: 'B',
          fret: 'o'
        },
        {
          string: 'e',
          fret: 'o'
        },
      ]
    }
  }

  setNote(selectedFret, selectedString) {
    this.state.chord.forEach(string => {
      if (string.string === selectedString) {
        string.fret = selectedFret;
      }
    })
    console.log(this.state.chord)
  }

  getChordName() {
    let chord = '';
    this.state.chord.forEach(string => {
      chord += string.fret;
    });

    console.log(chord)
    $.ajax({
      method: 'GET',
      url: `/name/?query=${chord}`

    })
  }

  render () {
    return (<div>
      <h1>Guitar Chord Finder</h1>
      <button className="btn btn-info" onClick={this.getChordName.bind(this)}>Get Chord Name</button>
      <div>
        <Guitar setNote={this.setNote.bind(this)} chord={this.state.chord}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
