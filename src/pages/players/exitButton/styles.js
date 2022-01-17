import styled from "styled-components";

const Container = styled.div`
    width: 28px;
    height: 28px;
    background: var(--main-purple);
    border-radius: 50%;

    &:hover{
        cursor: pointer;
    }

    &::before, &::after{
        content: '';
        display: block;
        height: .2rem;
        background: white;
        position: relative;
        max-width: 22px;
        max-height: 22px;
        padding: var().4rem;
    }

    &::before{
        top: 42%;
        left: 12%;
        transform: rotate(45deg);
    }

    &::after{
        top: 32%;
        left: 10%;
        transform: rotate(-45deg);
    }
`

export default Container;