import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;

    & .modal {
        text-align: center;
        position: relative;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        border: 1px solid black;
        border-radius: 8px;
        height: 150px;
        width: 80%;
        max-width: 400px;
        font-size: 1.4rem;
        background: #D1D0D0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 2px 6px 16px 6px rgba(0,0,0,1);
        -webkit-box-shadow: 2px 6px 16px 6px rgba(0,0,0,1);
        -moz-box-shadow: 2px 6px 16px 6px rgba(0,0,0,1);

        & p {
            margin-top: 1.5rem;
        }

        & .buttons {
            display: flex;
            justify-content: space-around;

            & button {
                font-size: 16px;
                font-weight: 600;
                width: 80px;
                height: 40px;
                border: 1px solid;
                border-radius: 8px;
                
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
    }
`

export default Container;