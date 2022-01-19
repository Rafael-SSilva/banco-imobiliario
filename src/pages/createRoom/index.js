import React, { useEffect, useState } from 'react'
import DefaultButton from '../../components/Button';
import DefaultInput from '../../components/Input';
import Logo from '../../components/Logo';
import Container from './styles'
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner';

import database from '../../firebase-config';
import {child, push, ref, set} from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { maxNumValue } from '../../utils/validators';
import Header from '../../components/Header';
import Modal from '../../components/modal';
import exitRoom from '../../utils/exitRoom';

function CreateRoom() {
    const [balance, setBalance] = useState(15000);
    const [name, setName] = useState();
    const navigate = useNavigate();
    const roomId = uuidv4();
    const roomRef = ref(database, `salas/${roomId}`)
    const playerId = localStorage.getItem('userKey');
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect( () => {
        const userKey = localStorage.getItem('userKey');
        const roomId = localStorage.getItem('roomId');

        if(userKey && roomId){
            navigate('/players')
        }
    }, [navigate])

    function handleName(e){
        setName(e.target.value);
    }

    function handleBalance(e){
        if (maxNumValue(e.target.value)){
            setBalance(parseInt(e.target.value));
        }
    }

    function handleCreate(){
        if(name && balance){
            setLoading(true);
            const newRoom = {
                balance : balance,
                id: roomId,
            }
            set(roomRef, newRoom).then( () => {
                localStorage.setItem('roomId', roomId);
                const newUser = push(child(roomRef,`/players`));
                
                set(newUser, {name, balance, id: newUser.key}).then(() => {
                    localStorage.setItem('userKey', newUser.key)
                    setLoading(false);
                    navigate('/players')
                }).catch((error) => {
                    console.log(error)
                })
            });
        }
    }

    function handleExitRoom(){
        const dbRef = ref(database)
        exitRoom(dbRef, roomId, playerId, () => navigate('/'), () => navigate('/'))
    }

    return (
        <Container>
            <Logo className='logo' setClick={ () => navigate('/')}/>
            {loading && <Spinner /> }
            <div className='wrapper'>
                {openModal &&
                    <Modal text={'Deseja sair?'} 
                        confirmText='Sim' confirmFnc={handleExitRoom}
                        cancelText='Não' cancelFnc={()=> setOpenModal(false)}/>
                }
                <DefaultInput placeholder={'Seu nome'} onChange={handleName} value={name}/>
                <DefaultInput placeholder={'Valor inicial'} onChange={handleBalance} value={balance} type='number'/> 
                <DefaultButton title={'Criar'} clickFnc={handleCreate}/>
            </div>
            <Header 
                handleGoHome={()=>navigate('/')}
                />
        </Container>
    )
}

export default CreateRoom;
