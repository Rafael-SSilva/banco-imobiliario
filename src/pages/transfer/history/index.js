import React from 'react'
import Container from './styles'

function History({transactions}) {
    return (
        <Container>
            {
            transactions && transactions.map(trans => {
                return <p key={trans.key}>{trans.text}</p>
            })
            }
        </Container>
    )
}

export default History
