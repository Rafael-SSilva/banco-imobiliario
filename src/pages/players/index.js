import React from 'react'
import DefaultButton from '../../components/Button'
import Container from './styles'

function PlayersScreen() {
    return (
        <Container>
            <div className='room'>
                <p>ID: #45454554</p>
                <p>R$: 99999,99</p>
            </div>
            <DefaultButton title={'Pagar banco'}/>
            <div className='playres'>
                <DefaultButton title={'Rafael'} btnStyle='white'/>
                <DefaultButton title={'Rafael'} btnStyle='white'/>
                <DefaultButton title={'Rafael'} btnStyle='white'/>
                <DefaultButton title={'Rafael'} btnStyle='white'/>
                <DefaultButton title={'Rafael'} btnStyle='white'/>
                <DefaultButton title={'Rafael'} btnStyle='white'/>
            </div>
        </Container>
    )
}

export default PlayersScreen
