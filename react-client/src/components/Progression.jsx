import React from 'react';
import ProgressionChord from './ProgressionChord.jsx';

const styles = {
  box: {
    'backgroundColor': '#F7F5E6',
    'margin': '30px auto',
    'border': '1px solid black',
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
    'backgroundColor': '#E8E8E8',
    'width': '90%',
    'border': '1px solid black',
    'textAlign':'center',
    'minHeight': '140px',
    'margin': 'auto',
    'marginBottom': '20px',
    'display': 'flex',
    'overflow': 'auto',
    'flexWrap': 'wrap'
  }
}

const Progression = ({addToProgression, removeFromProgression, retrieveProgression, deleteProgression, startOver, progression, getChordName, createProgression, saveProgression, showChord}) => (
  <div style={styles.box}>
    <div style={styles.row}>
      <h4 style={styles.h4}>Build A Progression:</h4>
      <input id="progressionName" type="text" placeholder="Add name here"></input>
    </div>
    <div>
      <button onClick={saveProgression}>Save Progression</button>
      <button onClick={retrieveProgression}>Retrieve Progression</button>
      <button onClick={deleteProgression}>Delete Progression</button>
    </div>
    <div style={styles.row}>
      <button onClick={addToProgression}>Add Current Chord</button>
      <button onClick={removeFromProgression}>Remove Last Chord</button>
      <button onClick={startOver}>Start Over</button>
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
