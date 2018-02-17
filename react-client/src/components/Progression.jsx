import React from 'react';

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
  }
}

const Progression = ({addToProgression, removeFromProgression, startOver}) => (
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
  </div>
)

export default Progression;
