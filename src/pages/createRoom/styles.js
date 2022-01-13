import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    & .wrapper {
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

`

export default Container;