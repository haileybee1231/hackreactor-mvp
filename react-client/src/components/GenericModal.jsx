import React from 'react';

const GenericModal = props => {

    const styles = {
        modal: {
            position: 'fixed',
            top: '42.5%',
            left: '40%',
            margin: 'auto',
            width: '20%',
            height: '15%',
            border: '3px black solid',
            borderRadius: '10px',
            backgroundColor: 'white',
            textAlign: 'center',
            paddingTop: '30px',
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
        },
        close: {
            position: 'fixed',
            top: '43.5%',
            right: '40.5%',
            cursor: 'pointer'
        }
    }

    return (
        <div style={styles.modal}>
            <div style={styles.close} onClick={props.closeModal}>X</div>
            <p>{props.message}</p>
        </div>
    )
}

export default GenericModal;