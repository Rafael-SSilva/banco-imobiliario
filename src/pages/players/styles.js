import styled from "styled-components";

const Container = styled.div`
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    
    .room-id { 
        button {
            padding: .4rem;
            background: var(--main-purple);
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: 600px;
            cursor: pointer;
        }
        div {
            font-weight: 600;
            margin: .4rem 0;
            border: 1px solid var(--main-purple);
            border-radius: 4px;
            padding: .4rem;
        }
    }

    .players {
        margin: 0 auto;

        & button:first-child{
            margin-bottom: 20px;
        }
    }

    .room > p {
        font-weight: 600;
        margin: .4rem 0;
        border: 1px solid var(--main-purple);
        border-radius: 4px;
        padding: .4rem;
    }

    .btn-close {
        align-self: flex-end;
    }

`

export default Container;