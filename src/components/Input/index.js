import React from 'react'
import Container from './styles'

function DefaultInput({placeholder, onChange, type='text', value='', disabled=false, ...rest}) {

    return (
        <Container 
            placeholder={placeholder} 
            onChange={onChange} 
            type={type} 
            value={value} 
            disabled={disabled}
            {...rest}
            />
    )
}

export default DefaultInput;
