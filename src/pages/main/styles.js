import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const TitleContainer = styled.div`
    text-align: center;
    margin: 2rem auto;

    & p {
        font-weight: 600;
    }
`


export default Container;
export {TitleContainer};