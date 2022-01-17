import React from 'react'
import Container from './styles';

function Modal({text, confirmText, cancelText, confirmFnc, cancelFnc}) {
    return (
        <Container>
            <div className='modal'>
                <p>{text}</p>
                <div className='buttons'>
                    <button type='button' onClick={confirmFnc}>{confirmText}</button>
                    <button type='button' onClick={cancelFnc}>{cancelText}</button>
                </div>
            </div>
        </Container>
    )
}

export default Modal;
