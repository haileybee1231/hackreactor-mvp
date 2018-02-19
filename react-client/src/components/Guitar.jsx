import React from 'react';
import String from '../components/String.jsx';

const styles = {
  guitar: {
    'padding': '10px',
    'border': '2px solid silver',
    'backgroundColor': '#4f2c15',
    'maxWidth': '900px',
    'margin': 'auto'
  },
  string: {
    'clear': 'both',
    'display': 'flex',
    'alignContent': 'center',
  }
}

const Guitar = (props) => (
  <div style={styles.guitar}>
    {Object.keys(props.chord).map((key, index) => (
      <div style={styles.string} key={index}>
        <String
          muted={props.chord[key].fret === 'x' ? true : false}
          setFret={props.setFret}
          toggleMute={props.toggleMute}
          name={key}
          fret={props.chord[key].fret}/>
      </div>
    ))}
  </div>
)

export default Guitar;
