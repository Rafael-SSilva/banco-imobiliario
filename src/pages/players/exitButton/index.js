import React from 'react'
import Container from './styles';
const reqSvgs = require.context ( './', true, /\.svg$/ )

function CloseBtn() {
    const paths = reqSvgs.keys()
    const svgs = paths.map( path => reqSvgs ( path ) )
    return (
        <Container />
    )
}

export default CloseBtn;
