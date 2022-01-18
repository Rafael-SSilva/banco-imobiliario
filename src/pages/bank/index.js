import React, {useState, useEffect} from 'react'
import DefaultButton from '../../components/Button';
import DefaultInput from '../../components/Input';
import History from '../../components/history';
import Container from './styles'
import { useLocation, useNavigate} from 'react-router-dom';
import { child, get, onValue, push, ref, set, update } from 'firebase/database';
import database from '../../firebase-config';
import Spinner from '../../components/spinner';

function BankScreen() {

    const [transfer, setTransfer] = useState();
    const {state} = useLocation();
    const navigate = useNavigate();
    const dbRef = ref(database);
    const playerId = localStorage.getItem('userKey');
    const roomId = localStorage.getItem('roomId');
    const [myData, setMyData] = useState({});
    const [history,setHistory] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(playerId && roomId){
            const roomRef = ref(database, `salas/${roomId}/players/${playerId}`);
            if(roomRef){
                onValue(roomRef, snap => {
                    if(snap.exists()){
                        const receivedData = snap.val();
                        setMyData(receivedData)
                        setLoading(false);
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
        }
        else {
            navigate('/players')
        }
    }, [navigate, playerId, roomId, state])
    

    function handleChange(e){
        let typeValue = e.target.value;
        let maxLength = 5;
        let newValue = typeValue.toString() <= maxLength ? parseInt(typeValue) : parseInt(typeValue.toString().substring(0, maxLength));

        setTransfer(newValue)
    }

    function handleTransfer(){
        if(myData && roomId && transfer){
            setLoading(true);
            get(child(dbRef,`salas/${roomId}/players/${myData.id}`)).then(userFromSnap => {
                const updates = {}
                const fromObj = userFromSnap.val()
                if(fromObj.balance >= parseInt(transfer)){

                    updates[`/players/${fromObj.id}`] = {...fromObj, balance: fromObj.balance - parseInt(transfer)}
                    update(ref(database, `salas/${roomId}`), updates).then( () => {
                        
                        const newHistoryFrom = push(child(dbRef,`salas/${roomId}/players/${fromObj.id}/history`));

                        set(newHistoryFrom, {received: false, value: transfer, text: `Pagou ${transfer} ao banco`}).then(() => {
                            setLoading(false);
                        }).catch( () => {
                            setLoading(false);
                        })
                        
                    })
                }
            }).catch( error => console.log(error))
        }
    }

    function handleAction(debit=true){
        setLoading(true);
        get(child(dbRef,`salas/${roomId}/players/${myData.id}`)).then(userFromSnap => {
            const updates = {}
            const fromObj = userFromSnap.val()
            const valTrans = debit && fromObj.balance < 2000 ? fromObj.balance : 2000

            updates[`/players/${fromObj.id}`] = {...fromObj, balance: debit ?  fromObj.balance - valTrans: fromObj.balance + valTrans}
            update(ref(database, `salas/${roomId}`), updates).then( () => {
                const newHistoryFrom = push(child(dbRef,`salas/${roomId}/players/${fromObj.id}/history`));
                const historyText = debit ? `Pagou ${valTrans} ao banco` : `Recebeu ${valTrans} do banco`

                set(newHistoryFrom, {received: !debit, value: valTrans, text: historyText}).then(() => {
                    setLoading(false);
                }).catch( () => {
                    setLoading(false);
                })
                
            })
        }).catch( error => setLoading(false))
    }

    function handleCreditIR(){
        handleAction(false)
    }

    function handleDebitIR(){
        handleAction(true)
    }

    function handleCreditStart(){
        handleAction(false)
    }

    return (
        <Container>
            {myData &&
                <div className='inputs'>
                    <p style={{fontWeight:'600'}}>Meu saldo: <span style={{color: 'green'}}>R${myData.balance}</span></p>
                    <DefaultInput placeholder='Banco Imobiliário' disabled={true}/>
                    <DefaultInput 
                        placeholder='Valor' 
                        onChange={handleChange} 
                        type='number' 
                        value={transfer}
                        min={0} max={2}
                        />
                    {loading ? 
                        <Spinner /> : 
                        <DefaultButton title={'Transferir'} clickFnc={handleTransfer}/>
                    }
                    <div className='actions'>
                        <DefaultButton title={'Receber IRRF'} clickFnc={handleCreditIR}/>
                        <DefaultButton title={'Pagar IRRF'} clickFnc={handleDebitIR}/>
                        <DefaultButton title={'Inicio'} clickFnc={handleCreditStart}/>
                    </div>
                </div>
            }
            <div className='history'>
                <History transactions={history}/>
            </div>
        </Container>
    )
}

export default BankScreen;
