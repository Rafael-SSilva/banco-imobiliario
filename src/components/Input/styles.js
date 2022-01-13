import styled from "styled-components";

const Container = styled.input`
    height: 40px;
    border: 2px solid var(--main-purple);
    width: var(--default-btn-size);
    display: block;
    border-radius: 8px;
    padding: 0 .6rem;
    line-height: 1rem;
    font-size: 1rem;
    color: var(--placeholder);

    :focus {
        outline-color: #cccccc;
        color: var(--main-purple);
    }
`

export default Container;