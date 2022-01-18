import React from 'react'
import Container from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt, faUsers, faTimes } from '@fortawesome/free-solid-svg-icons'

function Header() {

    function handleGoHome(){}

    function handleListUsers(){}

    function handleSignOut(){}

    function handleCloseMenu(){}
    
    return (
        <Container>
            <FontAwesomeIcon icon={faHome} onClick={handleGoHome}/>
            <FontAwesomeIcon icon={faUsers} onClick={handleListUsers}/>
            <FontAwesomeIcon icon={faSignOutAlt} onClick={handleSignOut} />
            <FontAwesomeIcon icon={faTimes} onClick={handleCloseMenu} />
        </Container>
    )
}

export default Header
