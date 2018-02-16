import React from 'react';
import Fret from '../components/Fret.jsx';

class String extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      frets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      selected: this.props.fret
    }
  }

  selectFret(fret) {
    this.setState({
      selected: fret
    });

    this.props.setNote(fret, this.props.string)
  }

  render() {
    return (
      <div>
        {this.state.frets.map(fret => {
          return <Fret
            selectFret={this.selectFret.bind(this)}
            key={fret}
            fret={fret}
            />
        })}
      </div>
    )
  }
}

export default String;
