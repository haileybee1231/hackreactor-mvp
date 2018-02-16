import React from 'react';

class Fret extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    }
  }

  onClick() {
    if (!this.state.selected) {
      this.props.selectFret(this.props.fret);
    } else {
      this.props.selectFret(0);
    }
    this.setState({
        selected: !this.state.selected
    });
  }

  render() {
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
        height: '15px',
        display: 'inline'
      }
    }

    if (!this.state.selected) {
      return (
        <div style={styles.fret}>
          <img
            style={styles.horizontal}
            onClick={this.onClick.bind(this)}
            src='https://image.flaticon.com/icons/svg/53/53916.svg'/>
          <img
            style={styles.vertical}
            src='http://clipground.com/images/vertical-clipart-4.png'/>
        </div>
      )
    } else {
      return (
        <div style={styles.fret}>
          <div onClick={this.onClick.bind(this)}>
            <img
              style={styles.horizontal}
              src='https://image.flaticon.com/icons/svg/53/53916.svg'/>
            <img
              style={styles.dot}
              src='http://www.clker.com/cliparts/y/K/J/U/l/Z/black-dot-md.png'/>
            <img
              style={styles.vertical}
              src='http://clipground.com/images/vertical-clipart-4.png'/>
          </div>
        </div>
      )
    }
  }
}

export default Fret;
