import React, {useState, useEffect} from 'react'
import DefaultButton from '../../components/Button';
import DefaultInput from '../../components/Input';
import History from '../../components/history';
import Container from './styles'
import { useLocation, useNavigate} from 'react-router-dom';
import { child, get, off, onValue, push, ref, set, update } from 'firebase/database';
import database from '../../firebase-config';
import Spinner from '../../components/spinner';
import Header from '../../components/Header';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../../components/modal';

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
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {

        function handleAction(debit=true, value, historyText){
            setLoading(true);
            get(child(ref(database),`salas/${roomId}/players/${playerId}`)).then(userFromSnap => {
                const updates = {}
                const fromObj = userFromSnap.val()
                const valTrans = debit && fromObj.balance < 2000 ? fromObj.balance : 2000
    
                updates[`/players/${fromObj.id}`] = {...fromObj, balance: debit ?  fromObj.balance - valTrans: fromObj.balance + valTrans}
                update(ref(database, `salas/${roomId}`), updates).then( () => {
                    const newHistoryFrom = push(child(ref(database),`salas/${roomId}/players/${fromObj.id}/history`));
    
                    set(newHistoryFrom, {received: !debit, value, text: historyText}).then(() => {
                        setLoading(false);
                    }).catch( () => {
                        setLoading(false);
                    })
                    
                })
            }).catch( () => setLoading(false))
        }

        if(playerId && roomId){
            onValue(ref(database, `salas/${roomId}/players/${playerId}`), snap => {
                if(snap.exists()){
                    const receivedData = snap.val();
                    setOpenModal(receivedData.requesting)
                    setMyData(receivedData)
                    setLoading(false);

                    if(openModal){
                        get(ref(database, `salas/${roomId}/players`)).then( (playersSnap) =>{
                            
                            const playersObj = playersSnap.val()
                            const playersLength = Object.keys(playersObj).length;
                            const updates = {}

                            if(receivedData.requesting && playersLength > 1 && receivedData.aprovals === (playersLength -1) ){
                                updates[`/players/${receivedData.id}`] = {...receivedData, requesting: false, aprovals: 0, requestvalue: 0}
                                update(ref(database, `salas/${roomId}`), updates).then (() =>{
                                    setMyData(m => ({...m,requesting:false}))
                                    setOpenModal(false)
                                    handleAction(
                                                receivedData.debit, 
                                                transfer, 
                                                `${receivedData.debit?'Pagou':'Recebeu'} ${transfer} ${receivedData.debit?' ao banco':'do banco'}`
                                                )
                                }).catch(()=>{
                                    setOpenModal(false)
                                })
                            }else if(!receivedData.requesting){
                                setOpenModal(false)
                            }
                        }).catch(()=>{
                            setOpenModal(false);
                        })
                    }

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
        else {
            navigate('/players')
        }

        return () => {
            off(ref(database, `salas/${roomId}/players/${playerId}`))
        }
    }, [navigate, playerId, roomId, state, openModal, transfer])
    

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
                const newTransf = transfer < 0 ? 0 : transfer;

                if(fromObj.balance >= newTransf && newTransf > 0){

                    updates[`/players/${fromObj.id}`] = {...fromObj, balance: fromObj.balance - newTransf}
                    update(ref(database, `salas/${roomId}`), updates).then( () => {
                        
                        const newHistoryFrom = push(child(dbRef,`salas/${roomId}/players/${fromObj.id}/history`));

                        set(newHistoryFrom, {received: false, value: transfer, text: `Pagou ${transfer} ao banco`}).then(() => {
                            setLoading(false);
                        }).catch( () => {
                            setLoading(false);
                        })
                        
                    })
                    
                } else {
                    setLoading(false);
                }
            }).catch( error => console.log(error))
        }
    }

    function openRequestModal(text='Solicitação', debit=true, value=0){
        
        get(child(ref(database),`salas/${roomId}/players`)).then( (snap) => {
            if(snap.exists()){
                let requestList = []
                let usersSnap = snap.val()
                Object.keys(usersSnap).forEach((key) => {
                    if(usersSnap[key].id.trim() !== playerId.trim() && usersSnap[key].requesting){
                        requestList.push(usersSnap[key]);
                    }
                });
                
                if(!openModal && !requestList.length){
                    const updates = {}
                    updates[`/players/${myData.id}`] = {...myData, requesting: true, request_text: text, debit, value }
                    update(ref(database, `salas/${roomId}`), updates).then (() =>{
                        setOpenModal(true)
                    })
                }
            }
        }).catch( () => {})

    }

    function handleCreditIR(){
        openRequestModal('Receber IRRF', false, 2000)
    }

    function handleDebitIR(){
        openRequestModal('Pagar IRRF', true, 2000)
    }

    function handleCreditStart(){
        openRequestModal('Receber inicio', false, 2000)
    }

    function handleReceive(){
        openRequestModal(`Receber ${transfer}`, false, transfer)
    }

    return (
        <Container>
            {openModal && <Modal text={'Aguardando aprovações'} waiting={true} />}
            {myData &&
                <div className='inputs'>
                    <div className='balance'><FontAwesomeIcon icon={faDollarSign}/><span style={{color: 'green', fontWeight:600}}>{myData.balance}</span></div>
                    <DefaultInput placeholder='Banco Imobiliário' disabled={true}/>
                    <DefaultInput 
                        placeholder='Valor' 
                        onChange={handleChange} 
                        type='number' 
                        value={transfer}
                        min={0} max={2}
                        />
                    {loading ? 
                        <Spinner/> : 
                        <>
                        <DefaultButton title={'Transferir'} clickFnc={handleTransfer}/>
                        <DefaultButton title={'Receber'} clickFnc={handleReceive}/>
                        </>
                    }
                    {
                    !loading && 
                    <div className='actions'>
                        <DefaultButton title={'Receber IRRF'} clickFnc={handleCreditIR}/>
                        <DefaultButton title={'Pagar IRRF'} clickFnc={handleDebitIR}/>
                        <DefaultButton title={'Receber inicio'} clickFnc={handleCreditStart}/>
                    </div>
                    }
                </div>
            }
            <div className='history'>
                <History transactions={history}/>
            </div>
            <Header handleListPlayers={()=> navigate('/players')}/>
        </Container>
    )
}

export default BankScreen;
