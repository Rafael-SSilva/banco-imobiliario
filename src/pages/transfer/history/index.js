import React from 'react'
import Container from './styles'

function History({transactions}) {
    return (
        <Container>
            {
            transactions && transactions.map(trans => {
                return <p>{trans.text}</p>
            })
            }
        </Container>
    )
}

export default History
