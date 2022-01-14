import React, {useState} from 'react'
import DefaultButton from '../../components/Button';
import DefaultInput from '../../components/Input';
import History from './history';
import Container from './styles'

function TransferingScreen() {

    const [transfer, setTransfer] = useState();

    const transfers = [
        {
            text: 'Pagou para funalo'
        },
        {
            text: 'Pagou para funalo'
        },
        {
            text: 'Pagou para funalo'
        },
        {
            text: 'Pagou para funalo'
        },
        {
            text: 'Pagou para funalo'
        },
    ]

    function handleChange(e){
        let typeValue = e.target.value;
        let maxLength = 5;
        let newValue = typeValue.toString() <= maxLength ? typeValue : parseInt(typeValue.toString().substring(0, maxLength));

        setTransfer(newValue)
    }

    return (
        <Container>
            <div className='inputs'>
                <DefaultInput placeholder='Para: Rafael' onChange={ () => {}} disabled={true}/>
                <DefaultInput 
                    placeholder='Valor' 
                    onChange={handleChange} 
                    type='number' 
                    value={transfer}
                    min={0} max={2}/>
                <DefaultButton title='Transferir' />
            </div>
            <History transactions={transfers}/>
        </Container>
    )
}

export default TransferingScreen;
