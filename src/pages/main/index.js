import React, { useEffect } from 'react'
import DefaultButton from '../../components/Button'
import Container, {TitleContainer} from './styles'

import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Header from '../../components/Header';

function MainPage() {

    const navigate = useNavigate();

    useEffect( () => {
        const userKey = localStorage.getItem('userKey');
        const roomId = localStorage.getItem('roomId');

        if(userKey && roomId){
            navigate('/players')
        }
    }, [navigate])

    return (
        <Container>
            <Header/>
            <Logo setClick={ () => navigate('/')}/>
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
