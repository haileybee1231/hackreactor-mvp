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
            paddingTop: '50px',
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
            <p>{props.message}</p>
        </div>
    )
}

export default GenericModal;