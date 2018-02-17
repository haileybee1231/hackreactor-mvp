import React from 'react';
import $ from 'jquery';

const styles = {
  h4: {
    'display': 'inline',
    'padding': '10px'
  },
  row: {
    'margin': '20px',
  },
  form: {
    'marginTop': '30px',
    'border': '1px solid black',
    'textAlign':'center',
    'width': '55%'
  }
}

const ChordForm = ({chord, getFingering}) => (
  <form style={styles.form}>
    <div style={styles.row}>
      <h4 style={styles.h4}>Pick A Note:</h4>
      <select name="notes">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="G">G</option>
      </select>
      <h4 style={styles.h4}>Accidental:</h4>
      <select name="accidentals">
        <option value=''></option>
        <option value="#">#</option>
        <option value="b">b</option>
      </select>
    </div>
    <div style={styles.row}>
      <h4 style={styles.h4}>Aug/Dim:</h4>
      <select name="altered">
        <option value=''></option>
        <option value="aug">aug</option>
        <option value="dim">dim</option>
      </select>
      <h4 style={styles.h4}>7th:</h4>
      <select name="7th">
        <option value=''></option>
        <option value="7">7</option>
        <option value="min7">min7</option>
        <option value="maj7">maj7</option>
      </select>
    </div>
    <div style={styles.row}>
      <h4 style={styles.h4}>Sus:</h4>
      <select name="suspensions">
        <option value=''></option>
        <option value="sus2">sus2</option>
        <option value="sus4">sus4</option>
      </select>
      <h4 style={styles.h4}>Other:</h4>
      <input type="text" placeholder="Other" style={{"maxWidth": "100px"}}></input>
    </div>
    <div style={styles.row, {'paddingBottom':'20px'}}>
      <button onClick={getFingering.bind(this)}>Get Chord Fingering</button>
    </div>
  </form>
)

export default ChordForm;
