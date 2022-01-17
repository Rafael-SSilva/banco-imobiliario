import React, { useState } from 'react'
import DefaultButton from '../../components/Button';
import DefaultInput from '../../components/Input';
import Logo from '../../components/Logo';
import Container from './styles'
import { useNavigate } from 'react-router-dom';

import database from '../../firebase-config';
import {child, push, ref, set} from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { maxNumValue } from '../../utils/validators';

function CreateRoom() {
    const [balance, setBalance] = useState(15000);
    const [name, setName] = useState();
    const navigate = useNavigate();
    const roomId = uuidv4();
    const roomRef = ref(database, `salas/${roomId}`)

    function handleName(e){
        setName(e.target.value);
    }

    function handleBalance(e){
        if (maxNumValue(e.target.value)){
            setBalance(e.target.value);
        }
    }

    function handleCreate(){
        if(name && balance){
            const newRoom = {
                balance : balance,
                id: roomId,
            }
            set(roomRef, newRoom).then( () => {
                localStorage.setItem('roomId', roomId);
                const newUser = push(child(roomRef,`/players`));
    
                set(newUser, {name, balance, key: newUser.key}).then(() => {
                    localStorage.setItem('userKey', newUser.key)
                    navigate('/players')
                }).catch((error) => {
                    console.log(error)
                })
            });
        }
    }

    return (
        <Container>
            <Logo />
            <div className='wrapper'>
                <DefaultInput placeholder={'Seu nome'} onChange={handleName} value={name}/>
                <DefaultInput placeholder={'Valor inicial'} onChange={handleBalance} value={balance} type='number'/> 
                <DefaultButton title={'Criar'} clickFnc={handleCreate}/>
            </div>
        </Container>
    )
}

export default CreateRoom;
