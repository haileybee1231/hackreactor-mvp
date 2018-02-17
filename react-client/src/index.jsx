import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Guitar from '../src/components/Guitar.jsx';
import ChordForm from '../src/components/ChordForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        string6: {
          name: 'e',
          fret: 'o',
          muted: false
        },
        string5: {
          name: 'B',
          fret: 'o',
          muted: false
        },
        string4: {
          name: 'G',
          fret: 'o',
          muted: false
        },
        string3: {
          name: 'D',
          fret: 'o',
          muted: false
        },
        string2: {
          name: 'A',
          fret: 'o',
          muted: false
        },
        string1: {
          name: 'E',
          fret: 'o',
          muted: false
        }
    }
  }

  setFret(selectedFret, selectedString) {
    const replacement = this.state[selectedString];
    if (!replacement.muted) {
      replacement.fret = replacement.fret === selectedFret ? 'o' : selectedFret;

      this.setState({
        [selectedString]: replacement
      });
    }
  }

  toggleMute(selectedString) {
    const replacement = this.state[selectedString];
    let muted = replacement.muted;

    replacement.fret = muted ? 'o' : 'x';
    replacement.muted = !muted;

    this.setState({
      [selectedString]: replacement
    });
  }

  getChordName() {
    let chord = '';
    let index = 1;
    while (index < 7) {
      chord += this.state[`string${index}`].fret;
      index++;
    }

    $.ajax({
      method: 'GET',
      url: `/fingering/?query=${chord}`,
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

  getFingering(e) {
    e.preventDefault();
    let note = $('select[name=notes]').val();
    let accidental = $('select[name=accidentals]').val();
    let altered = $('select[name=altered]').val();
    let seventh = $('select[name=7th]').val();
    let sus = $('select[name=suspensions]').val();
    let extra = $('input[type=text]').val();
    let query = `${note}${accidental}${altered}${seventh}${sus}${extra}`;

    $.ajax({
      method: 'GET',
      url: `/name/?query=${query}`,
      success: (data) => {
        let results = {};
        JSON.parse(data).objects.forEach(result => {
          for (let prop in result) {
            results[prop] = result[prop];
          }
        })
        let fingering = results.code;

        const replacement = this.state;
        for (let i = 1; i < 7; i++) {
          let note = fingering[i - 1];
          if (!isNaN(note)) {
            note = +note;
          }
          replacement[`string${i}`].fret = note;
        }
        this.setState(replacement);
      }
    })
  }

  render () {
    return (<div>
      <h1>Guitar Chord Finder</h1>
      <button className="btn btn-info" onClick={this.getChordName.bind(this)}>Get Chord Name</button>
      <h3>Chord Name: <span id='chordName'>Em7add4</span></h3>
      <div>
        <Guitar
          setFret={this.setFret.bind(this)}
          chord={this.state}
          toggleMute={this.toggleMute.bind(this)}/>
      </div>
      <div>
        <ChordForm getFingering={this.getFingering.bind(this)} chord={this.state}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
