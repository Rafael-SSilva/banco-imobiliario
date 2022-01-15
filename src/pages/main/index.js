import React from 'react'
import DefaultButton from '../../components/Button'
import Container, {TitleContainer} from './styles'

import { useNavigate } from 'react-router-dom';

function MainPage({children}) {

    const navigate = useNavigate();

    return (
        <Container>
            <TitleContainer>
                <h1>Bem Vindo</h1>
                <p>Banco imobiliario manager</p>
            </TitleContainer>
            <div>
                <DefaultButton title="Criar sala" clickFnc={ () => navigate('/new')}/>
                <DefaultButton title="Participar" clickFnc={ () => navigate('/join')}/>
            </div>
        </Container>
    )
}

export default MainPage;
