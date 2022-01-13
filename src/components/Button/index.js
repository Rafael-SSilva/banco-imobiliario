import React from 'react'
import Container, { WhiteButton } from './styles'

function DefaultButton({title, clickFnc, btnStyle = 'Purple'}) {

    if(btnStyle.toUpperCase() === 'WHITE'){
        return (
            <WhiteButton onClick={clickFnc}>
                {title}
            </WhiteButton>
        )
    }
    return (
        <Container onClick={clickFnc}>
            {title}
        </Container>
    )
}

export default DefaultButton;
