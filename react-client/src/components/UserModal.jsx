import React from 'react';

const UserModal = props => {

    const styles = {
        modal: {
            position: 'fixed',
            top: '35%',
            left: '35%',
            margin: 'auto',
            width: '30%',
            height: '30%',
            border: '3px black solid',
            borderRadius: '10px',
            backgroundColor: 'white',
            textAlign: 'center',
            fontSize: '2em'
        },
        button: {
            padding: '10px',
            backgroundColor: 'green',
            borderRadius: '10px',
            color: 'white',
            fontSize: '0.6em',
            marginTop: '20px',
            cursor: 'pointer'
        }
    }

    return (
        <div style={styles.modal}>
            <h3>{props.type}</h3>
            <form>
                <div>
                    <label>Username: </label>
                    <input onChange={(e) => props.handleChange(e, 'username')} type="text" value={props.username}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input onChange={(e) => props.handleChange(e, 'password')} type="password" value={props.password}/>
                </div>
                <button style={styles.button} onClick={props.handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default UserModal;