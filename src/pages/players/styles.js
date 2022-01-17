import styled from "styled-components";

const Container = styled.div`
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    
    .players {
        margin: 0 auto;

        & button:first-child{
            margin-bottom: 20px;
        }
    }

    & p {
        font-weight: 600;
    }

    .btn-close {
        align-self: flex-end;
    }

`

export default Container;