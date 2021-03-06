import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 98vh;
    margin-top: 2vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    & .inputs {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        & .balance {
            display: flex;
            align-items: flex-end;
            align-self: flex-start;

            & span {
                padding-left: .2rem;
            }

            & svg {
                font-size: 1.4rem;
            }
        }
        
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

    & .actions {
        margin-top: 2rem;
    }

    & .history {
        padding: .8rem 0 1rem;
    }
`

export default Container;