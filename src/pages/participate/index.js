import React from 'react'
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../../components/Button';
import DefaultInput from '../../components/Input';
import Logo from '../../components/Logo';
import Container from './styles'

function Participate() {

    const navigate = useNavigate();

    return (
        <Container>
            <Logo />
            <div className='wrapper'>
                <DefaultInput placeholder={'ID da sala'} onChange={() => {alert('Ok')}} />
                <DefaultInput placeholder={'Seu nome'} onChange={() => {alert('Ok')}}/> 
                <DefaultButton title={'Entrar'} clickFnc={() => navigate('/players')} />
            </div>
        </Container>
    )
}

export default Participate;
