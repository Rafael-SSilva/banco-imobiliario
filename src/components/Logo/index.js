import React from 'react'
import Container from './styles'
import logo from '../../assets/bi-logo.png'

function Logo({setClick}) {
    return (
        <Container onClick={setClick}>
            <img src={logo} alt='logo-bi'/>
        </Container>
    )
}

export default Logo
