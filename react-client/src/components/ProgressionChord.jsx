import React from 'react';

class ProgressionChord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }
  }

  handleHover() {
    this.setState({
      hover: !this.state.hover
    })
  }

  render() {
    const styles = {
      chord: {
        'color': 'black',
        'float': 'left',
        'fontSize': '2vmin',
        'padding': '10px',
        'onHover': 'cursor',
        'border': '1px black solid',
        'width': '19%',
        'height': '45%',
        'margin': '2px',
        'fontWeight': this.state.hover ? 'bold' : 'normal',
        'cursor': this.state.hover ? 'pointer' : 'normal'
      }
    }
    return (
      <div
        onMouseEnter={this.handleHover.bind(this)}
        onMouseLeave={this.handleHover.bind(this)}
        onClick={this.props.showChord}
        style={styles.chord}
      >
        <div>
          {this.props.chord.name}: {this.props.chord.fingering}
        </div>
      </div>
    )
  }

}

export default ProgressionChord;
