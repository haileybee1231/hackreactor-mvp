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
            paddingLeft: '100px'
        },
        login: {
            float: 'left',
            display: 'inline',
            marginLeft: '70%',
            marginTop: '-42px'
        },
        button: {
            display: 'inline',
            padding: '10px',
            fontSize: '16px',
            marginLeft: '20px',
            borderRadius: '5px',
            cursor: 'pointer',
        }
    }

    return(
        <div style={styles.topbar}>
            <p style={{display: 'inlineBlock'}} >Welcome{props.loggedInUser ? `, ${props.loggedInUser}` : null}</p>
            <div style={styles.login}>
                <button style={styles.button} onClick={props.signup}>Signup</button>
                <button style={styles.button} onClick={props.login}>Login</button>
                <button style={styles.button} onClick={props.logout}>Logout</button>
            </div>
        </div>
    )
}

export default Topbar;