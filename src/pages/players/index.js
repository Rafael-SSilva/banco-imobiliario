import React, { useEffect, useState } from 'react'
import DefaultButton from '../../components/Button'
import Container from './styles'
import database from '../../firebase-config';
import {ref, onValue, update, off, get, child} from 'firebase/database';
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
    const [myData, setMyData] = useState({});
    const roomId = localStorage.getItem('roomId');
    const playerId = localStorage.getItem('userKey');
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [aproved, setAproved] = useState(false);
    const [requesters, setRequesters] = useState([]);
    const [aprovals, setAprovals] = useState([]);
    
    useEffect(() => {
        setRequesters([])

        if(!roomId || !playerId){
            navigate('/')
        }

        get(child(ref(database),`salas/${roomId}/players/${playerId}`)).then( (snap) => {
            if(!snap.exists()){
                navigate('/') 
            }
        }).catch( () => navigate('/'))


        onValue(ref(database, `salas/${roomId}/players`), (snapshot) => {
            const newData = snapshot.val();
            const playersList = [];
            const reqList = []
            
            setRequesters([])

            if(newData){
                Object.keys(newData).forEach((key) => {
                    if(newData[key].id.trim() !== playerId.trim()){
                        
                        playersList.push(newData[key]);
                        if(newData[key].requesting){
                            reqList.push(newData[key])

                            if (newData[key].aprovals === playersList.length){
                                setAprovals(prev => prev.filter(pl => pl !== newData[key].id))
                                setAproved(false)
                            }
                        }
                    }
                    else {
                        setMyData(newData[key])
                    }
                });
                if(playersList){
                    setUsers(playersList)
                }

                if(reqList.length){
                    setRequesters(reqList)                    
                }
                else {
                    setAproved(false)
                }
            }
            });

        return () => {
            off(ref(database, `salas/${roomId}/players`))
        }

    }, [roomId, playerId, navigate, setAprovals])

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
        console.log(requesters)
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
            setAproved(true)
            setAprovals(m => [...aprovals, user.id])
            
        })
    }

    return (
        <Container>
            {requesters && requesters.length > 0 && aproved && aprovals.length > 0 &&
            <Modal text='Aguardando jogadores' waiting={true}/>}
            {requesters && requesters.length > 0 && !aproved &&
                requesters.map (
                    user => 
                    aprovals.filter(x => x !== user.id).length === 0 &&
                    <Modal 
                        key={user.id}
                        text={`${user.name} - ${user?.request_text || ''}`}
                        confirmText='Aprovar' confirmFnc={()=> handleAprove(user)}
                        cancelText='Rejeitar' cancelFnc={()=> handleDeny(user)}
                        />
                )}
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
                            /> )
                }
            </div>
            <Header 
                handleGoHome={()=>navigate('/')}
                handleExitRoom={()=> setOpenModal(true)}
                />
        </Container>
    )
                
}

export default PlayersScreen;
