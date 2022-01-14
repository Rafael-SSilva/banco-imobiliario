import React from 'react'
import Container from './styles'

function DefaultButton({title, clickFnc, btnStyle = 'PURPLE'}) {
    return (
        <Container 
            white={btnStyle.toUpperCase() === 'WHITE'} 
            onClick={clickFnc}>
            {title}
        </Container>
    )
}

export default DefaultButton;
