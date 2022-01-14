import styled from "styled-components";

const Container = styled.button`
    --background: ${props => props.white ? 'none': '#957FEF'};
    --border: ${props => props.white ? '2px solid #957FEF': 'none'};
    --color: ${props => props.white ? '#957FEF': '#EBEBEB'};
    background: var(--background);
    color: var(--color);
    border-radius: 8px;
    width: var(--default-btn-size);
    height: 40px;
    border: var(--border);
    font-weight: 600;
    font-size: 16px;
    margin: .4rem 0;
    display: block;

    &:hover {
        cursor: pointer;
    }
`

export default Container;