import React from 'react';
import Fret from '../components/Fret.jsx';
import $ from 'jquery';

class String extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      frets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      selected: this.props.fret,
      muted: false
    }
  }

  selectFret(fret) {
    if (this.state.selected === 'o') {
      this.setState({
        selected: fret
      });
    }

    if (!this.state.muted) {
      this.props.setNote(fret, this.props.string)
    }
  }

  muteFret(e) {
    this.setState({
      muted: !this.state.muted,
    })
    if (!this.state.muted) {
      this.setState({
        selected: 'x'
      })
      $(e.target).css({'backgroundColor': 'red'});
    } else {
      $(e.target).css({'backgroundColor': ''});
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.muteFret.bind(this)}>X</button>
        {this.state.frets.map(fret => {
          return <Fret
            selectFret={this.selectFret.bind(this)}
            currentlySelected={this.state.selected}
            key={fret}
            fret={fret}
            muted={this.state.muted}
            />
        })}
      </div>
    )
  }
}

export default String;
