import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 95vh;
    margin-top: 5vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    & .inputs {
        
        & .balance {
            display: flex;
            align-items: flex-end;

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
        margin-top: 4rem;
    }
`

export default Container;