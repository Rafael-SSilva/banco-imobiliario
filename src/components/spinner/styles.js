import styled from "styled-components";

const Container = styled.div`
    width: 5rem;
    height: 5rem;
    border: 4px solid var(--placeholder);
    border-top-color: var(--main-purple);
    border-radius: 50%;
    animation: spin 1s infinite ease-in-out;

    @keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
`

export default Container;