import React from 'react';
import ProgressionChord from './ProgressionChord.jsx';

const styles = {
  box: {
    'backgroundColor': 'black',
    'boxShadow': '2px 2px 2px 2px black',
    'color': 'white',
    'margin': '30px auto',
    'border': '1px solid silver',
    'borderRadius': '15px',
    'textAlign':'center',
    'width': '55%',
    'minHeight': '270px',
    'maxWidth': '500px'
  },
  h4: {
    'display': 'inline',
    'padding': '10px'
  },
  row: {
    'margin': '20px',
  },
  chordBox: {
    'backgroundColor':'#D9D8D8',
    'width': '90%',
    'border': '1px solid black',
    'textAlign':'center',
    'minHeight': '140px',
    'margin': 'auto',
    'marginBottom': '20px',
    'display': 'flex',
    'overflow': 'auto',
    'flexWrap': 'wrap'
  },
  button: {
    'backgroundColor': '676361',
    'color': 'black',
    'margin': '2px',
    'borderRadius': '12px',
    'fontSize': '1em'
  },
  input: {
    'borderRadius': '9px',
    'padding': '4px'
  }
}

const Progression = ({addToProgression, removeFromProgression, retrieveProgression, deleteProgression, startOver, progression, getChordName, createProgression, saveProgression, showChord}) => (
  <div style={styles.box}>
    <div style={styles.row}>
      <h4 style={styles.h4}>Build A Progression:</h4>
      <input style={styles.input} id="progressionName" type="text" placeholder="Add name here"></input>
    </div>
    <div>
      <button style={styles.button} onClick={saveProgression}>Save Progression</button>
    <button style={styles.button} onClick={retrieveProgression}>Retrieve Progression</button>
  <button style={styles.button} onClick={deleteProgression}>Delete Progression</button>
    </div>
    <div style={styles.row}>
      <button style={styles.button} onClick={addToProgression}>Add Current Chord</button>
    <button style={styles.button} onClick={removeFromProgression}>Remove Last Chord</button>
  <button style={styles.button} onClick={startOver}>Start Over</button>
    </div>
    <div style={styles.chordBox}>
      {progression &&
        progression.map((chord, index) => {
        return <ProgressionChord
          key={index}
          chord={chord}
          showChord={showChord}
        />
      })}
    </div>
  </div>
)

export default Progression;
