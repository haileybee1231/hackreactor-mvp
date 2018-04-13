import React from 'react';

const Topbar = props => {
    const styles = {
        topbar: {
            width: '100%',
            position: 'fixed',
            height: '60px',
            backgroundColor: 'black',
            color: 'white',
            marginTop: '-8px',
            marginLeft: '-10px',
            textAlign: 'left',
            paddingLeft: '10%'
        },
        login: {
            float: 'left',
            display: 'inline',
            marginLeft: '60%',
            marginTop: '-60px'
        },
        button: {
            display: 'inline',
            padding: '10px',
            fontSize: '16px',
            marginLeft: '20px',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        welcome: {
            display: 'block',
            clear: 'none',
            fontSize: '1.5em',
            marginTop: '-2px',
            paddingTop: '18px'
        }
    }

    return(
        <div style={styles.topbar}>
            <p style={styles.welcome}>Welcome{props.loggedInUser ? `, ${props.loggedInUser}` : '! Please log in to work on your progressions.'}</p>
            <div style={styles.login}>
                <button style={styles.button} onClick={props.signup}>Signup</button>
                <button style={styles.button} onClick={props.login}>Login</button>
                <button style={styles.button} onClick={props.logout}>Logout</button>
            </div>
        </div>
    )
}

export default Topbar;