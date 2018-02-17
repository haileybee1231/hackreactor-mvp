import React from 'react';

const styles = {
  fret: {
    position: 'relative',
    float: 'left',
  },
  horizontal: {
    width: '25px'
  },
  vertical: {
    width: '25px',
  },
  dot: {
    position: 'relative',
    left: '-20px',
    top: '-5px',
    marginRight: '-15px',
    height: '15px',
    display: 'inline'
  }
}

const Fret = ({setFret, fretNumber, selected, name}) => (
  <div style={styles.fret}>
    <div onClick={() => setFret(fretNumber, name)}>
      <img
        style={styles.horizontal}
        src='https://image.flaticon.com/icons/svg/53/53916.svg'/>
      {selected &&
        <img
          style={styles.dot}
          src='http://www.clker.com/cliparts/y/K/J/U/l/Z/black-dot-md.png'
        />
      }
      <img
        style={styles.vertical}
        src='http://clipground.com/images/vertical-clipart-4.png'/>
    </div>
  </div>
)

export default Fret;
