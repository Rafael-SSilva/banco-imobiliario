import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../../components/Button';
import DefaultInput from '../../components/Input';
import Logo from '../../components/Logo';
import Container from './styles'
import database from '../../firebase-config';
import {ref, set, get, child, push} from 'firebase/database';
import Spinner from '../../components/spinner';
import Header from '../../components/Header';

function Participate() {

    const navigate = useNavigate();
    const [roomId, setRoomId] = useState();
    const [userName, setUserName] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userKey = localStorage.getItem('userKey');
        const roomId = localStorage.getItem('roomId');
        
        if(userKey && roomId){
            navigate('/players')
        }
    }, [navigate])

    function handleRoomId(e){
        setRoomId(e.target.value)
    }

    function handleUserName(e){
        setUserName(e.target.value);
    }

    function handleJoinRoom(){
        if(roomId && userName){
            setLoading(true);
            const dbRef = ref(database)
            if(dbRef){
                get(child(dbRef,`salas/${roomId}`)).then( (snapshot) =>{
                    
                    if(snapshot.exists()) {
                        const roomRef = ref(database, `salas/${roomId}`)
                        const newUser = push(child(roomRef,`/players`));
                        const balance = snapshot.val().balance;
    
                        localStorage.setItem('roomId', roomId)
            
                        set(newUser, {name:userName, balance, id: newUser.key, requesting: false, aprovals: 0, aproved: false, requestvalue: 0}).then(() => {
                            localStorage.setItem('userKey', newUser.key)
                            setLoading(false);
                            navigate('/players')
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                })

            }

        }
    }

    return (
        <Container>
            <Logo setClick={ () => navigate('/')}/>
            {loading && <Spinner /> }
            <div className='wrapper'>
                <DefaultInput placeholder={'ID da sala'} onChange={handleRoomId} value={roomId}/>
                <DefaultInput placeholder={'Seu nome'} onChange={handleUserName} value={userName}/> 
                <DefaultButton title={'Entrar'} clickFnc={handleJoinRoom} />
            </div>
            <Header handleGoHome={()=>navigate('/')}/>
        </Container>
    )
}

export default Participate;
