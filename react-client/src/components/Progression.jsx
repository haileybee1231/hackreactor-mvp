import React from 'react';
import ProgressionChord from './ProgressionChord.jsx';

const styles = {
  box: {
    'marginTop': '30px',
    'border': '1px solid black',
    'textAlign':'center',
    'width': '55%',
    'minHeight': '270px'
  },
  h4: {
    'display': 'inline',
    'padding': '10px'
  },
  row: {
    'margin': '20px',
  },
  chordBox: {
    'width': '90%',
    'border': '1px solid black',
    'textAlign':'center',
    'minHeight': '140px',
    'margin': 'auto'
  }
}

const Progression = ({addToProgression, removeFromProgression, startOver, progression}) => (
  <div style={styles.box}>
    <div style={styles.row}>
      <h4 style={styles.h4}>Build A Progression:</h4>
      <input id="progressionName" type="text" placeholder="Add name here"></input>
    </div>
    <div style={styles.row}>
      <button onClick={addToProgression}>Add Current Chord</button>
      <button onClick={removeFromProgression}>Remove Last Chord</button>
      <button onClick={startOver}>Start Over</button>
    </div>
    <div style={styles.chordBox}>
      {progression &&
        progression.map(chord => {
        <ProgressionChord/>
      })}
    </div>
  </div>
)

export default Progression;
