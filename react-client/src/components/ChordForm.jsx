import React from 'react';
import $ from 'jquery';

const styles = {
  form: {
    'borderRadius': '15px',
    'backgroundColor': 'black',
    'boxShadow': '2px 2px 2px 2px black',
    'color': 'white',
    'margin': 'auto',
    'marginTop': '30px',
    'border': '1px solid silver',
    'textAlign':'center',
    'width': '50%',
    'maxWidth' :'400px'
  },
  h4: {
    'display': 'inline',
    'padding': '10px'
  },
  row: {
    'margin': '20px',
  },
  button: {
    'backgroundColor': '#676361',
    'color': 'black',
    'margin': '2px',
    'borderRadius': '12px',
    'fontSize': '1em'
  },
  input: {
    'borderRadius': '4px',
    'padding': '2px'
  }
}

const ChordForm = ({chord, fingeringChart}) => (
  <form style={styles.form}>
    <div style={styles.row}>
      <h4 style={styles.h4}>Pick A Note:</h4>
      <select style={styles.input} name="notes">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="G">G</option>
      </select>
      <h4 style={styles.h4}>Accidental:</h4>
      <select style={styles.input} name="accidentals">
        <option value=''></option>
        <option value="#">#</option>
        <option value="b">b</option>
      </select>
    </div>
    <div style={styles.row}>
      <h4 style={styles.h4}>Aug/Dim:</h4>
      <select style={styles.input} name="altered">
        <option value=''></option>
        <option value="aug">aug</option>
        <option value="dim">dim</option>
      </select>
      <h4 style={styles.h4}>maj/m</h4>
      <select style={styles.input} name="major">
        <option value=''></option>
        <option value="maj">maj</option>
        <option value="m">m</option>
      </select>
      <h4 style={styles.h4}>7th:</h4>
      <select style={styles.input} name="7th">
        <option value=''></option>
        <option value="7">7</option>
      </select>
    </div>
    <div style={styles.row}>
      <h4 style={styles.h4}>Sus:</h4>
      <select style={styles.input} name="suspensions">
        <option value=''></option>
        <option value="sus2">sus2</option>
        <option value="sus4">sus4</option>
      </select>
      <h4 style={styles.h4}>Other:</h4>
      <input type="text" placeholder="Other" style={{"maxWidth": "100px"}}></input>
    </div>
    <div style={styles.row, {'paddingBottom':'20px'}}>
      <button style={styles.button} onClick={fingeringChart.bind(this)}>Get Chord Fingering</button>
    </div>
  </form>
)

export default ChordForm;
