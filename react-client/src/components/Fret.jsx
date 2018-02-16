import React from 'react';

class Fret extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    }
  }


  render() {
    const styles = {
      unselectedHoriz: {
        width: '50px'
      },
      unselectedVert: {
        width: '50px',
        marginLeft: '-10px'
      }
    }

    if (!this.state.selected) {
      return (
        <div className="fret">
          <img style={styles.unselectedHoriz} src='https://image.flaticon.com/icons/svg/53/53916.svg'/>
          <img style={styles.unselectedVert} src='http://clipground.com/images/vertical-clipart-4.png'/>
        </div>
      )
    }
  }
}

export default Fret;
