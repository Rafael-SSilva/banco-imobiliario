import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    & .inputs {
        
        & input {
            margin: .8rem 0;
        }

        & input:first-child {
        background: #EBEBEB;
        color: black;
        
            :focus {
                outline: none;
                cursor: default;
            }
        }
    }
`

export default Container;