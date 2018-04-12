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
            fontSize: '1.5vw'
        },
        button: {
            padding: '10px',
            backgroundColor: 'green',
            borderRadius: '10px',
            color: 'white',
            fontSize: '1vw',
            marginTop: '20px',
            cursor: 'pointer'
        },
        close: {
            position: 'fixed',
            top: '36%',
            right: '36%',
            cursor: 'pointer'
        },
        inputField: {
            fontSize: '1.5vw',
            width: '60%'
        }
    }

    return (
        <div style={styles.modal}>
            <div style={styles.close} onClick={props.closeModal}>X</div>
            <h3>{props.type}</h3>
            <form>
                <div>
                    <label>Username: </label>
                    <input style={styles.inputField} onChange={(e) => props.handleChange(e, 'username')} type="text" value={props.username}/>
                </div>
                <div style={{paddingTop: '10px'}}>
                    <label style={{paddingRight: '5px'}}>Password: </label>
                    <input style={styles.inputField} onChange={(e) => props.handleChange(e, 'password')} type="password" value={props.password}/>
                </div>
                <button style={styles.button} onClick={props.handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default UserModal;