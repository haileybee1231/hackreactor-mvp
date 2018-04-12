import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Guitar from '../src/components/Guitar.jsx';
import ChordForm from '../src/components/ChordForm.jsx';
import Progression from '../src/components/Progression.jsx';
import Topbar from '../src/components/Topbar.jsx';
import UserModal from '../src/components/UserModal.jsx';
import GenericModal from '../src/components/GenericModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chord: {
        string6: {
          name: 'e',
          fret: 'o',
          muted: false
        },
        string5: {
          name: 'B',
          fret: 'o',
          muted: false
        },
        string4: {
          name: 'G',
          fret: 'o',
          muted: false
        },
        string3: {
          name: 'D',
          fret: 'o',
          muted: false
        },
        string2: {
          name: 'A',
          fret: 'o',
          muted: false
        },
        string1: {
          name: 'E',
          fret: 'o',
          muted: false
        }
      },
      progression: [],
      bar: 0,
      userModalOpen: false,
      modalType: '',
      username: '',
      password: '',
      genericModalOpen: false,
      genericModalMessage: '',
      loggedInUser: '',
      chordName: 'Em7add4'
    }
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: '/persist',
      success: data => {
        if (data.length) {
          this.setState({
            loggedInUser: data[0].username
          })
        }
      }
    })
  }

  setFret(selectedFret, selectedString) {
    const replacement = this.state.chord;
    let string = replacement[selectedString]
    if (!string.muted) {
      string.fret = string.fret === selectedFret ? 'o' : selectedFret;

      this.setState({
        chord: replacement
      });
    }
  }

  toggleMute(selectedString) {
    const replacement = this.state.chord;
    let string = replacement[selectedString]
    let muted = string.muted;

    string.fret = muted ? 'o' : 'x';
    string.muted = !muted;

    this.setState({
      chord: replacement
    });
  }

  getChordName() {
    let chord = '';
    let index = 1;
    while (index < 7) {
      this.state.chord[`string${index}`].fret ? chord += this.state.chord[`string${index}`].fret : null;
      index++;
    }
    if (this.state.bar > 0) {
      for (let i = 0; i < chord.length; i++) {
        if (!isNaN(Number(chord[i]))) {
          chord = chord.slice(0, i) + (chord[i] - this.state.bar + 1) + chord.slice(i + 1, chord.length);
        }
      }
      chord += `_${this.state.bar}`;
    }

    $.ajax({
      method: 'GET',
      url: `/name/?query=${chord}`,
      success: (data) => {
        let results = {};
        JSON.parse(data).objects.forEach(result => {
          for (let prop in result) {
            results[prop] = result[prop];
          }
        })
        if (results.name) {
          this.setState({
            chordName: results.name
          })
        } else {
          this.setState({
            chordName: ''
          })
          $('#chordName').html('Chord not in library, or API query limit reached =,( Try another chord or try again later.');
        }
      }
    })
  }

  fingeringChart(e) {
    e.preventDefault();
    let note = $('select[name=notes]').val();
    let accidental = $('select[name=accidentals]').val();
    if (accidental === '#') {
      accidental = encodeURIComponent(accidental);
    }
    let altered = $('select[name=altered]').val();
    let major = $('select[name=major]').val();
    let seventh = $('select[name=7th]').val();
    let sus = $('select[name=suspensions]').val();
    let extra = $('input[type=text]').val();
    let query = `${note}${accidental}${major}${altered}${seventh}${sus}${extra}`;

    this.getFingering(query);
  }

  getFingering(query) {
    $.ajax({
      method: 'GET',
      url: `/fingering/?query=${query}`,
      success: (data) => {
        let results = {};
        JSON.parse(data).objects.forEach(result => {
          for (let prop in result) {
            results[prop] = result[prop];
          }
        })
        let fingering = results.code;
        let bar;
        if (fingering.length > 6) {
          bar = +fingering.slice(-1) - 1;
          this.setState({
            bar: bar + 1
          });
        } else {
          this.setState({
            bar: 0
          })
        }

        const replacement = this.state.chord;
        for (let i = 1; i < 7; i++) {
          let note = fingering[i - 1];
          if (!isNaN(note)) {
            bar ? note = +note + bar : note = +note;
          }
          replacement[`string${i}`].fret = note;
        }
        this.setState({
          chord: replacement,
          chordName: results.name
        });
      }
    })
  }

  showChord(e) {
    e.preventDefault();
    let str = $(e.target).html().slice(-26);
    str = str.slice(0, 6);
    this.getFingering(str);
  }

  saveProgression() {
    if ($('#progressionName').val() && this.state.progression.length > 0) {
      let data = {
        chords: this.state.progression,
        name: $('#progressionName').val(),
        date: new Date()
      }
      $.ajax({
        method: 'POST',
        url: '/progression',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (message) => {
          this.setState({
            genericModalOpen: true,
            genericModalMessage: message
          });
          setTimeout(() => {
            this.setState({
              genericModalMessage: '',
              genericModalOpen: false
            })
          }, 1000)
        }
      })
    } else if ($('#progressionName').val()) {
      this.setState({
        genericModalOpen: true,
        genericModalMessage: 'Please enter chords in your progression!'
      });
      setTimeout(() => {
        this.setState({
          genericModalMessage: '',
          genericModalOpen: false
        })
      }, 1000)
    } else {
      this.setState({
        genericModalOpen: true,
        genericModalMessage: 'Please enter a name for your progression!'
      });
      setTimeout(() => {
        this.setState({
          genericModalMessage: '',
          genericModalOpen: false
        })
      }, 1000)    }
  }

  retrieveProgression() {
    let name = $('#progressionName').val();
    if (name) {
      let data = {
        name: name
      }
      $.ajax({
        method: 'GET',
        url: '/progression',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => {
          this.setState({
            genericModalOpen: true,
            genericModalMessage: `Progression ${name} successfully retrieved!`,
            progression: JSON.parse(data)[0].chords
          });
          setTimeout(() => {
            this.setState({
              genericModalMessage: '',
              genericModalOpen: false
            })
          }, 1000)
        },
        fail: (data) => {
          this.setState({
            genericModalOpen: true,
            genericModalMessage: data,
            progression: JSON.parse(data)[0].chords
          });
          setTimeout(() => {
            this.setState({
              genericModalMessage: '',
              genericModalOpen: false
            })
          }, 1000)
        }
      })
    } else {
      this.setState({
        genericModalOpen: true,
        genericModalMessage: `Please enter a name to search and try again.`
      });
      setTimeout(() => {
        this.setState({
          genericModalMessage: '',
          genericModalOpen: false
        })
      }, 1000)
    }
  }

  deleteProgression() {
    let name = $('#progressionName').val();
    let data = {name: name};
    $.ajax({
      type: 'DELETE',
      url: '/progression',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: (message) => {
        this.setState({
          genericModalOpen: true,
          genericModalMessage: message
        });
        setTimeout(() => {
          this.setState({
            genericModalMessage: '',
            genericModalOpen: false
          })
        }, 1000)
      },
      fail: (message) => {
        this.setState({
          genericModalOpen: true,
          genericModalMessage: message
        });
        setTimeout(() => {
          this.setState({
            genericModalMessage: '',
            genericModalOpen: false
          })
        }, 1000)
      }
    })
  }

  addToProgression() {
    this.getChordName(() => {
      let name = $('#chordName').html();
      let fingering = '';
      let index = 1;
      while (index < 7) {
        fingering += this.state.chord[`string${index}`].fret;
        index++;
      };
      this.setState({
        progression: this.state.progression.concat({name: name, fingering: fingering})
      })
    })
  }

  removeFromProgression() {
    let replacement = this.state.progression.slice();
    if (replacement.length > 0) {
      replacement.pop();
    }
    this.setState({
      progression: replacement
    })
  }

  startOver() {
    this.setState({
      progression: []
    })
  }

  login() {
    this.setState({
      userModalOpen: !this.state.userModalOpen,
      modalType: 'Login'
    })
  }
  
  signup() {
    this.setState({
      userModalOpen: !this.state.userModalOpen,
      modalType: 'Signup'
    })
  }

  logout() {
    $.ajax({
      method: 'POST',
      url: '/logout',
      success: () => {
        this.setState({
          loggedInUser: '',
          genericModalOpen: true,
          genericModalMessage: 'Successfully logged out!'
        });
        setTimeout(() => {
          this.setState({
            genericModalMessage: '',
            genericModalOpen: false
          })
        }, 1000)
      },
      fail: () => {
        this.setState({
          genericModalOpen: true,
          genericModalMessage: 'There was a problem logging you out. Please try again.'
        });
        setTimeout(() => {
          this.setState({
            genericModalMessage: '',
            genericModalOpen: false
          })
        }, 1000)
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let {username, password} = this.state;
    this.state.modalType === 'Signup' ? 
      $.ajax({
        method: 'POST',
        url: '/signup',
        contentType: 'application/json',
        data: JSON.stringify({ username: username, password: password }),
        success: (data) => {
          this.setState({ 
            loggedInUser: username,
            genericModalOpen: true,
            genericModalMessage: 'Successfully signed up and logged in!',
            username: '',
            password: ''
          });
          setTimeout(() => {
            this.setState({ userModalOpen: false, genericModalOpen: false, genericModalMessage: '' })
          }, 1000)
        },
        statusCode: {
          500: () => {
            this.setState({
              genericModalOpen: true,
              genericModalMessage: 'That username is taken, please pick another.'
            });
            setTimeout(() => {
              this.setState({
                genericModalMessage: '',
                genericModalOpen: false
              })
            }, 1000)
          }
        },
        fail: (data) => {
          this.setState({
            genericModalOpen: true,
            genericModalMessage: 'Oops, problem signing up :('
          });
          setTimeout(() => {
            this.setState({
              genericModalMessage: '',
              genericModalOpen: false
            })
          }, 1000)
        }
      }) : 
      $.ajax({
        method: 'POST',
        url: '/login',
        contentType: 'application/json',
        data: JSON.stringify({ username: username, password: password }),
        success: (data) => {
          this.setState({
            loggedInUser: username,
            genericModalOpen: true,
            genericModalMessage: 'Successfully logged in!',
            username: '',
            password: ''
          });
          setTimeout(() => {
            this.setState({ userModalOpen: false, genericModalOpen: false, genericModalMessage: '' })
          }, 1000)
        },
        fail: (data) => {
          this.setState({
            genericModalOpen: true,
            genericModalMessage: 'Oops, problem logging in :('
          });
          setTimeout(() => {
            this.setState({
              genericModalMessage: '',
              genericModalOpen: false
            })
          }, 1000)
        }
      })
  }

  handleChange(e, name) {
    this.setState({
      [name]: e.target.value
    })
  }

  render () {
    const styles ={
      app: {
        'fontFamily': 'sans-serif',
        'textAlign': 'center',
      },
      button: {
        'backgroundColor': 'black',
        'color': 'white',
        'margin': '20px auto',
        'borderRadius': '12px',
        'fontSize': '30px',
        'padding': '15px',
        'cursor': 'pointer'
      },
      logo: {
        'width': '400px'
      }
    }
    return (<div style={styles.app}>
      <Topbar 
        loggedInUser={this.state.loggedInUser}
        signup={this.signup.bind(this)}
        login={this.login.bind(this)}
        logout={this.logout.bind(this)}
       />
      <div style={{paddingTop: '100px'}}>
        <img style={styles.logo} src={'https://i.imgur.com/1IkSJLF.png'} alt="logo"/>
        <h2>Chord Finder and Progression Builder</h2>
      </div>
      <h3>Current Chord Name: <span id='chordName'>{this.state.chordName}</span></h3>
      <button style={styles.button} onClick={this.getChordName.bind(this)}>Update Chord Name</button>
      <div>
        <Guitar
          setFret={this.setFret.bind(this)}
          chord={this.state.chord}
          toggleMute={this.toggleMute.bind(this)}/>
      </div>
      <div>
        <ChordForm fingeringChart={this.fingeringChart.bind(this)} chord={this.state.chord}/>
      </div>
      <div>
        <Progression
          progression={this.state.progression}
          saveProgression={this.saveProgression.bind(this)}
          retrieveProgression={this.retrieveProgression.bind(this)}
          deleteProgression={this.deleteProgression.bind(this)}
          removeFromProgression={this.removeFromProgression.bind(this)}
          addToProgression={this.addToProgression.bind(this)}
          startOver={this.startOver.bind(this)}
          getChordName={this.getChordName.bind(this)}
          showChord={this.showChord.bind(this)}
        />
      </div>
      {this.state.userModalOpen ? 
      <UserModal 
        type={this.state.modalType} 
        username={this.state.username}
        password={this.state.password}
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)} 
      /> : null}
      {this.state.genericModalOpen ? 
      <GenericModal message={this.state.genericModalMessage}/> : null}
    </div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
