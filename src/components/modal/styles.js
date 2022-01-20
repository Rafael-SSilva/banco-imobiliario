import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .9;
    
    & .modal {
        text-align: center;
        position: relative;

        border: 1px solid black;
        border-radius: 8px;
        /* height: 100%;
        max-height: 30vh; */
        width: 80%;
        max-width: 500px;
        font-size: 1.4rem;
        background: #D1D0D0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        box-shadow: 2px 6px 16px 6px rgba(0,0,0,1);
        -webkit-box-shadow: 2px 6px 16px 6px rgba(0,0,0,1);
        -moz-box-shadow: 2px 6px 16px 6px rgba(0,0,0,1);

        & p {
            margin-top: 1.5rem;
        }

        & .buttons {
            display: flex;
            justify-content: space-around;
            margin: 0;

            & button {
                font-size: 16px;
                font-weight: 600;
                width: 80px;
                height: 40px;
                border: 1px solid;
                border-radius: 8px;
                
                &:hover{
                    cursor: pointer;
                }

                :first-child {
                    background: var(--main-purple);
                    border-color: #ffffff;
                    color: #ffffff;
                }

                :last-child {
                    background: #FAFAFA;
                    border-color: var(--main-purple);
                    color: var(--main-purple);
                }
            }
        }

        & .spinner {
            text-align: center;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            margin: 1rem;
        }
    }
`

export default Container;