import React, { useEffect, useState } from 'react'
import DefaultButton from '../../components/Button'
import Container from './styles'
import database from '../../firebase-config';
import {ref, onValue} from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import Header from '../../components/Header';
import exitRoom from '../../utils/exitRoom';
import { faUser, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PlayersScreen() {
    const [users, setUsers] = useState([]);
    const [myData, setMyData] = useState(0);
    const roomId = localStorage.getItem('roomId');
    const playerId = localStorage.getItem('userKey');
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    
    useEffect(() => {
        if(!roomId || !playerId){
            navigate('/')
        }
        const roomRef = roomId ? ref(database, `salas/${roomId}`): null;
        if(roomRef){
            onValue(roomRef, (snapshot) => {
                const newData = snapshot.val();
                const playersList = [];

                if(newData && newData.players){
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
    }, [roomId, playerId, navigate])

    function notify(){
        toast.success('ID copiado', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

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

    return (
        <Container>
            <div className='room'>
                <CopyToClipboard text={roomId}>
                    <button onClick={notify}>Copiar ID da sala</button>
                </CopyToClipboard>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
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
            <Header 
                handleGoHome={()=>navigate('/')}
                handleExitRoom={()=> setOpenModal(true)}
                />
        </Container>
    )
                
}

export default PlayersScreen
