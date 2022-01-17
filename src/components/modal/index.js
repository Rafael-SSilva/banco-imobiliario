import React from 'react'
import Container from './styles';

function Modal() {
    return (
        <Container>
            <div className='modal'>
                <p>Deseja sair da sala?</p>
                <div className='buttons'>
                    <button type='button'>Sim</button>
                    <button type='button'>Não</button>
                </div>
            </div>
        </Container>
    )
}

export default Modal;
