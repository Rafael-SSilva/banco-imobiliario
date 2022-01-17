import React from 'react'
import Container from './styles'
import logo from '../../assets/bi-logo.png'

function Logo() {
    return (
        <Container>
            <img src={logo} alt='logo-bi'/>
        </Container>
    )
}

export default Logo
