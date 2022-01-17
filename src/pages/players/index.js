import React, { useEffect, useState } from 'react'
import DefaultButton from '../../components/Button'
import Container from './styles'
import database from '../../firebase-config';
import {ref, onValue} from 'firebase/database';
import { useNavigate } from 'react-router-dom';

function PlayersScreen() {
    const [roomData, setRoomData] = useState({});
    const [users, setUsers] = useState([]);
    const [myData, setMyData] = useState(0);
    const roomId = localStorage.getItem('roomId');
    const playerId = localStorage.getItem('userKey');
    const navigate = useNavigate();
    
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

    return (
        <Container>
            <div className='room'>
                <p>ID: #{roomData && roomData.id}</p>
                <p>R$: {myData && myData.balance ? myData.balance : 0}</p>
            </div>
            <div className='players'>
                <DefaultButton title={'Pagar banco'} />
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
