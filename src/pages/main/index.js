import React from 'react'
import DefaultButton from '../../components/Button'
import Container, {TitleContainer} from './styles'

function MainPage({children}) {
    return (
        <Container>
            <TitleContainer>
                <h1>Bem Vindo</h1>
                <p>Banco imobiliario manager</p>
            </TitleContainer>
            <div>
                <DefaultButton title="Criar sala" clickFnc={ () => { alert('Criar sala')}}/>
                <DefaultButton title="Participar" clickFnc={ () => { alert('Participar')}}/>
            </div>
        </Container>
    )
}

export default MainPage;
