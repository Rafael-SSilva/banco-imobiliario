import React from 'react'
import Container from './styles'

function DefaultInput({placeholder, onChange}) {
    return (
        <Container value={placeholder} onChange={onChange}/>
    )
}

export default DefaultInput;
