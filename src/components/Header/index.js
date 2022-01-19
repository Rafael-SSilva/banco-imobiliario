import React from 'react'
import Container from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons'

function Header({handleGoHome, handleListPlayers, handleExitRoom}) {
    
    return (
        <Container>
            {handleGoHome && <FontAwesomeIcon icon={faHome} onClick={handleGoHome}/>}
            {handleListPlayers && <FontAwesomeIcon icon={faUsers} onClick={handleListPlayers}/>}
            {handleExitRoom && <FontAwesomeIcon icon={faSignOutAlt} onClick={handleExitRoom}/>}
        </Container>
    )
}

export default Header
