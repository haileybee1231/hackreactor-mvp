import React from 'react';
import String from '../components/String.jsx';

const Guitar = (props) => (
  <div>
    {props.chord.map((string, index) => {
      return (
        <div style={{'clear':'both'}} key={index}>
          <String
            setNote={props.setNote}
            string={string.string}
            fret={string.fret}/>
        </div>
      )
    })}
  </div>
)

export default Guitar;
