import React from 'react';
import String from '../components/String.jsx';

const Guitar = (props) => (
  <div>
    {Object.keys(props.chord).map((key, index) => (
      <div style={{'clear':'both'}} key={index}>
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
