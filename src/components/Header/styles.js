const { default: styled } = require("styled-components");

const Container = styled.div`
    width: 100%;
    height: 70px;
    background: var(--main-purple);
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 2rem;

    & svg {
        font-size: 32px;
        color: white;

        &:hover {cursor:pointer}
    }
`

export default Container;