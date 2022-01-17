import React, {useState, useEffect} from 'react'
import DefaultButton from '../../components/Button';
import DefaultInput from '../../components/Input';
import History from './history';
import Container from './styles'
import { useLocation, useNavigate} from 'react-router-dom';
import { child, get, onValue, push, ref, set, update } from 'firebase/database';
import database from '../../firebase-config';

function TransferingScreen() {

    const [transfer, setTransfer] = useState();
    const {state} = useLocation();
    const [userTo, setUserTo] = useState({}); 
    const navigate = useNavigate();
    const dbRef = ref(database);
    const playerId = localStorage.getItem('userKey');
    const roomId = localStorage.getItem('roomId');
    const [myData, setMyData] = useState({});
    const [transferEnable, setTransferEnable] = useState(true);
    const [history,setHistory] = useState([])

    useEffect(() => {
        if(state.userTo && playerId && roomId){
            const roomRef = ref(database, `salas/${roomId}/players/${playerId}`);
            if(roomRef){
                onValue(roomRef, snap => {
                    if(snap.exists()){
                        const receivedData = snap.val();
                        setMyData(receivedData)
                        if(receivedData && receivedData.history){
                            let hist = []
                            Object.keys(receivedData.history).forEach((key) => {
                                hist.push({
                                    key,
                                    text:  receivedData.history[key].text,
                                    received: receivedData.history[key].received
                                });
                            });
                            setHistory(hist)
                        }
                    }
                })
            }
            setUserTo(state.userTo);
        }
        else {
            navigate('/players')
        }
    }, [navigate, playerId, roomId, state])
    

    function handleChange(e){
        let typeValue = e.target.value;
        let maxLength = 5;
        let newValue = typeValue.toString() <= maxLength ? typeValue : parseInt(typeValue.toString().substring(0, maxLength));

        setTransfer(newValue)
    }

    function handleTransfer(){
        if(playerId && roomId && userTo && transfer){
            setTransferEnable(false);
            get(child(dbRef,`salas/${roomId}/players/${playerId}`)).then(userFromSnap => {
                get(child(dbRef,`salas/${roomId}/players/${userTo.id}`)).then( userToSnap => {
                    const updates = {}
                    const fromObj = userFromSnap.val()
                    const toObj = userToSnap.val()
                    if(fromObj.balance >= parseInt(transfer)){

                        updates[`/players/${fromObj.id}`] = {...fromObj, balance: fromObj.balance - parseInt(transfer)}
                        updates[`/players/${toObj.id}`] = {...toObj, balance: toObj.balance + parseInt(transfer)}
                        update(ref(database, `salas/${roomId}`), updates).then( () => {
                            
                            const newHistoryFrom = push(child(dbRef,`salas/${roomId}/players/${fromObj.id}/history`));
                            const newHistoryTo = push(child(dbRef,`salas/${roomId}/players/${toObj.id}/history`))

                            set(newHistoryTo, {received: true, value: transfer, text: `Recebeu R$${transfer}`}).then(() => {
                                set(newHistoryFrom, {received: false, value: transfer, text: `Pagou R$${transfer}`}).then(() => {
                                    setTransferEnable(true);
                                })
                            })
                            setTransferEnable(true);
                        })
                    }
                }).catch( error => console.log(error))
            }).catch( error => console.log(error))
        }
    }

    return (
        <Container>
            {
                userTo && myData &&
                <div className='inputs'>
                    <p style={{fontWeight:'600'}}>Meu saldo: <span style={{color: 'green'}}>R${myData.balance}</span></p>
                    <DefaultInput placeholder={`Para: ${userTo.name}`} disabled={true}/>
                    <DefaultInput 
                        placeholder='Valor' 
                        onChange={handleChange} 
                        type='number' 
                        value={transfer}
                        min={0} max={2}
                        />
                    <DefaultButton title={transferEnable ? 'Transferir' : 'Transferindo...'} clickFnc={handleTransfer} disabled={!transferEnable}/>
                </div>
            }
            {
                <History transactions={history}/>
            }
        </Container>
    )
}

export default TransferingScreen;