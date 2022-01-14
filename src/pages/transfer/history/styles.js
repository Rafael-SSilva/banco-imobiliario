import styled from "styled-components";

const Container = styled.div`
    border: 1px solid var(--main-purple);
    height: 200px;
    width: 300px;
    border-radius: 8px;
    overflow-y: auto;

    & p {
        display: block;
        padding: .1rem .4rem;
    }

    & p:first-child p:last-child {
        margin-top: .5rem;
    }
`

export default Container;