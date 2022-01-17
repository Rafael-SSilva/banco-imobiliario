import React, { createRef, useEffect, useState } from 'react'
import DefaultButton from '../../components/Button'
import Container from './styles'
import database from '../../firebase-config';
import {ref, onValue, remove, child, get} from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal';
import CloseBtn from './exitButton';

function PlayersScreen() {
    const [roomData, setRoomData] = useState({});
    const [users, setUsers] = useState([]);
    const [myData, setMyData] = useState(0);
    const roomId = localStorage.getItem('roomId');
    const playerId = localStorage.getItem('userKey');
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const idRef = createRef();
    
    useEffect(() => {
        const roomRef = roomId ? ref(database, `salas/${roomId}`): null;
        if(roomRef){
            onValue(roomRef, (snapshot) => {
                const newData = snapshot.val();
                const playersList = [];

                if(newData && newData.players){
                    setRoomData(newData)
                    Object.keys(newData.players).forEach((key) => {
                        if(newData.players[key].id.trim() !== playerId.trim()){
                            
                            playersList.push(newData.players[key]);
                        }
                        else {
                            setMyData(newData.players[key])
                        }
                    });
                    if(playersList){
                        setUsers(playersList)
                    }
                }
                });
        }
    }, [roomId, playerId])

    function handleTransfering(e){   
        navigate('/transactions', {state: {userTo: {id:e.target.id, name:e.target.name}}})
    }

    function closeModal(){
        setOpenModal(false)
    }

    function handleExitRoom(){
        const dbRef = ref(database)
        get(child(dbRef,`salas/${roomId}/players/${myData.id}`)).then(() => {
            remove(child(dbRef,`salas/${roomId}/players/${myData.id}`)).then( () => {
                localStorage.removeItem('userKey')
                localStorage.removeItem('roomId')
                navigate('/')
            })
        }).catch( () => {
            localStorage.removeItem('userKey')
            localStorage.removeItem('roomId')
            navigate('/')
        })
    }

    function haldeCopyId(){
        const el = idRef;
        navigator.clipboard.writeText(el.current.innerText).then( () => {
            console.log('Copiado')
        })
    }

    return (
        <Container>
            <div className='btn-close' onClick={() => setOpenModal(true)}><CloseBtn /></div>
            <div className='room-id'>
                <p>ID:<span ref={idRef}>{roomData && roomData.id}</span></p>
                <button type='button' onClick={haldeCopyId}>Copiar</button>
            </div>
            <div className='room'>

                <p>Jogador: <span>{myData ? myData.name : ''}</span></p>
                <p>R$:<span style={{color: 'green'}}>{myData && myData.balance ? myData.balance : 0}</span></p>
            </div>
            <div className='players'>
                <DefaultButton title={'Pagar banco'} />
                {openModal &&
                     <Modal text={'Deseja sair?'} 
                            confirmText='Sim' confirmFnc={handleExitRoom}
                            cancelText='Não' cancelFnc={closeModal}/>
                }
                {users && users.length > 0 &&
                    users.map( user => 
                        <DefaultButton 
                            title={user.name} 
                            btnStyle='white' 
                            key={user.id} 
                            clickFnc={handleTransfering}
                            id={user.id}
                            name={user.name}
                            />)
                }
            </div>
        </Container>
    )
                
}

export default PlayersScreen
