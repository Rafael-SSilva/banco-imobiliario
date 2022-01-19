import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 10vh;

    & .wrapper {
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

`

export default Container;