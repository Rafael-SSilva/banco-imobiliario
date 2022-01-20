import React, { Fragment, useEffect, useState } from 'react'
import DefaultButton from '../../components/Button'
import Container from './styles'
import database from '../../firebase-config';
import {ref, onValue, update, off} from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import Header from '../../components/Header';
import exitRoom from '../../utils/exitRoom';
import { faUser, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PlayersScreen() {
    const [users, setUsers] = useState([]);
    const [myData, setMyData] = useState(0);
    const roomId = localStorage.getItem('roomId');
    const playerId = localStorage.getItem('userKey');
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [aproved, setAproved] = useState(false);
    
    useEffect(() => {
        if(!roomId || !playerId){
            navigate('/')
        }

        onValue(ref(database, `salas/${roomId}/players`), (snapshot) => {
            const newData = snapshot.val();
            const playersList = [];
            
            setAproved(false)
            if(newData){
                Object.keys(newData).forEach((key) => {
                    if(newData[key].id.trim() !== playerId.trim()){
                        
                        playersList.push(newData[key]);
                    }
                    else {
                        setMyData(newData[key])
                    }
                });
                if(playersList){
                    setUsers(playersList)
                }
            }
            });

        return () => {
            off(ref(database, `salas/${roomId}/players`))
        }

    }, [roomId, playerId, navigate])

    function handleTransfering(e){   
        navigate('/transactions', {state: {userTo: {id:e.target.id, name:e.target.name}}})
    }

    function closeModal(){
        setOpenModal(false)
    }

    function handleExitRoom(){
        const dbRef = ref(database)
        exitRoom(dbRef, roomId, playerId, () => navigate('/'), () => navigate('/'))
    }

    function handleDeny(user){
        const updates = {}
        updates[`/players/${user.id}`] = {...user, requesting: false}
        update(ref(database, `salas/${roomId}`), updates).then (() =>{
            console.log('Rejeitado')
        })
    }

    function handleAprove(user){
        const updates = {}
        updates[`/players/${user.id}`] = {...user, aprovals: user.aprovals + 1}
        update(ref(database, `salas/${roomId}`), updates).then (() =>{
            console.log('Aprovado')
            setAproved(true)
        })
    }

    return (
        <Container>
            <div className='room'>
                <CopyToClipboard text={roomId}>
                    <button>Copiar ID da sala</button>
                </CopyToClipboard>
            </div>
            <div className='user'>
                <div className='wrapper'>
                    <div className='name'>
                        <FontAwesomeIcon icon={faUser}/>
                        <p>{myData ? myData.name : ''}</p>
                    </div>
                    <div className='balance'>
                        <FontAwesomeIcon icon={faDollarSign}/>
                        <p>{myData && myData.balance ? myData.balance : 0}</p>
                    </div>
                </div>
            </div>
            <div className='players'>
                <DefaultButton title={'Banco'} clickFnc={() => navigate('/bank')} />
                {openModal &&
                     <Modal text={'Deseja sair?'} 
                            confirmText='Sim' confirmFnc={handleExitRoom}
                            cancelText='Não' cancelFnc={closeModal}/>
                }
                {users && users.length > 0 &&
                    users.map( user => 
                        < Fragment key={user.id}>
                        {user.requesting && !aproved?
                        <Modal 
                            key={user.id}
                            text={`${user.name} - ${user?.request_text || ''}`}
                            confirmText='Aprovar' confirmFnc={()=> handleAprove(user)}
                            cancelText='Rejeitar' cancelFnc={()=> handleDeny(user)}
                        />:
                        user.requesting && aproved ?
                            <Modal text='Aguardando jogadores' waiting={true}/>   
                        :
                        <DefaultButton 
                            title={user.name} 
                            btnStyle='white' 
                            key={user.id} 
                            clickFnc={handleTransfering}
                            id={user.id}
                            name={user.name}
                            />}
                        </ Fragment>
                        )
                }
            </div>
            <Header 
                handleGoHome={()=>navigate('/')}
                handleExitRoom={()=> setOpenModal(true)}
                />
        </Container>
    )
                
}

export default PlayersScreen
