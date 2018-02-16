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
  }

  getChordName() {
    let chord = '';
    this.state.chord.forEach(string => {
      chord += string.fret;
    });

    $.ajax({
      method: 'GET',
      url: `/name/?query=${chord}`,
      success: (data) => {
        let results = {};
        JSON.parse(data).objects.forEach(result => {
          for (let prop in result) {
            results[prop] = result[prop];
          }
        })
        $('#chordName').text(results.name);
      }
    })
  }

  render () {
    return (<div>
      <h1>Guitar Chord Finder</h1>
      <button className="btn btn-info" onClick={this.getChordName.bind(this)}>Get Chord Name</button>
      <h3>Chord Name: <span id='chordName'></span></h3>
      <div>
        <Guitar setNote={this.setNote.bind(this)} chord={this.state.chord}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
