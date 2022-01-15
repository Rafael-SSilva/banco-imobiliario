import React from 'react'
import DefaultButton from '../../components/Button';
import DefaultInput from '../../components/Input';
import Logo from '../../components/Logo';
import Container from './styles'
import { useNavigate } from 'react-router-dom';

function CreateRoom() {
    
    const navigate = useNavigate();

    return (
        <Container>
            <Logo />
            <div className='wrapper'>
                <DefaultInput placeholder={'Seu nome'} onChange={() => {alert('Ok')}}/>
                <DefaultInput placeholder={'Valor inicial'} onChange={() => {alert('Ok')}}/> 
                <DefaultButton title={'Criar'} clickFnc={() => navigate('/players')}/>
            </div>
        </Container>
    )
}

export default CreateRoom;
