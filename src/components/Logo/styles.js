import styled from "styled-components";

const Container = styled.div`
    height: 80px;
    width: 100px;
    background: var(--main-purple);
    border-radius: 16px;
    color: white;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 280px;
    }
`

export default Container;