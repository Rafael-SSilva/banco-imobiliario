import styled from "styled-components";

const Container = styled.button`

    background: var(--main-purple);
    color: #EBEBEB;
    border-radius: 8px;
    width: var(--default-btn-size);
    height: 40px;
    border: none;
    font-weight: 600;
    font-size: 16px;
    margin: .4rem 0;
    display: block;

    &:hover {
        cursor: pointer;
    }
`

const WhiteButton = styled(Container)`
    background: none;
    border: 2px solid var(--main-purple);
    color: var(--main-purple);
`

export default Container;
export {WhiteButton};