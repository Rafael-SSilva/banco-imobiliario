import styled from "styled-components";

const Container = styled.div`
    height: inherit;
    display: flex;
    height: 95vh;
    margin-top: 5vh;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
    .room{ 
        margin: 0 auto;
        & button {
            padding: .6rem;
            background: var(--main-purple);
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: 700;
            cursor: pointer;
        }

    }

    .user {
        padding: 0 1rem;
        width: 100%;
        display: flex;
        justify-content: space-around;

        .wrapper{
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            max-width: 280px;
        }

        svg {
                font-size: 2rem;
                color: #8319EE;
                margin: 10px 0;
                max-width: 2.5rem;
            }

         p{
            font-size: 20px;
            font-weight: 600;
        }

        & .name {
            display: flex;
            width: 100%;
            max-width: 45%;
            align-items: baseline;
            justify-content: center;

            & p{
                position: relative;
                bottom: .2rem;
            }
        }

        & .balance {
            display: flex;
            align-items: baseline;
            justify-content: center;
            width: 100%;
            max-width: 40%;

            & p{
                position: relative;
                bottom: .4rem;
                color: green;
            }
        }
    }

    .players {
        margin: 0 auto;
        min-height: inherit;
        overflow-y: auto;
        

        & button:first-child{
        }
    }


`

export default Container;