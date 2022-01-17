import React from 'react'
import Container from './styles'

function DefaultButton({title, clickFnc, btnStyle = 'PURPLE', ...rest}) {
    return (
        <Container 
            white={btnStyle.toUpperCase() === 'WHITE'} 
            onClick={clickFnc}
            {...rest}>
            {title}
        </Container>
    )
}

export default DefaultButton;
