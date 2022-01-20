import React from 'react'
import Spinner from '../spinner';
import Container from './styles';

function Modal({text, confirmText='', cancelText='', confirmFnc, cancelFnc, waiting=false}) {
    return (
        <Container>
            <div className='modal'>
                <p>{text}</p>
                <div className='buttons'>
                    {confirmFnc && <button type='button' onClick={confirmFnc}>{confirmText}</button>}
                    {cancelFnc && <button type='button' onClick={cancelFnc}>{cancelText}</button>}
                </div>
                {waiting &&
                <div className='spinner'>
                    <Spinner />
                </div>
                }
            </div>
        </Container>
    )
}

export default Modal;
