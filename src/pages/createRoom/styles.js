import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    height: 90vh;
    width: 100%;
    margin-top: 10vh;

    & .logo{
    }

    & .wrapper {
        height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
`

export default Container;