import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Guitar from '../src/components/Guitar.jsx';
import ChordForm from '../src/components/ChordForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chord: [
        {
          string: 'e',
          fret: 'o'
        },
        {
          string: 'B',
          fret: 'o'
        },
        {
          string: 'G',
          fret: 'o'
        },
        {
          string: 'D',
          fret: 'o'
        },
        {
          string: 'A',
          fret: 'o'
        },
        {
          string: 'E',
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
    chord = chord.split('').reverse().join('');

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
        if (results.name) {
          $('#chordName').html(results.name);
        } else {
          $('#chordName').html('Chord not in library, or API query limit reached =,( Try another chord or try again later.');
        }
      }
    })
  }

  render () {
    return (<div>
      <h1>Guitar Chord Finder</h1>
      <button className="btn btn-info" onClick={this.getChordName.bind(this)}>Get Chord Name</button>
      <h3>Chord Name: <span id='chordName'>Em7add4</span></h3>
      <div>
        <Guitar setNote={this.setNote.bind(this)} chord={this.state.chord}/>
      </div>
      <div>
        <ChordForm/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
