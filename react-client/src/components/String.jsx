import React from 'react';
import Fret from '../components/Fret.jsx';
import $ from 'jquery';

const fretNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const styles = {
  string: {
    margin: 'auto'
  },
  muted: {
    backgroundColor: 'red'
  }
}

const String = ({setFret, toggleMute, name, fret, muted}) => (
  <div style={styles.string}>
    {fretNumbers.map(fretNumber => {
      const selected = fret === fretNumber;
      return <Fret
        setFret={setFret}
        key={fretNumber}
        name={name}
        fretNumber={fretNumber}
        selected={selected}
        />
    })}
    <button
      onClick={() => toggleMute(name)}
      style={muted ? styles.muted : null}
      >X</button>
  </div>
)

export default String;
