import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderStyled = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  & .spinner-icon {
    width: 1.5rem;
    height: 1.5rem;
    box-sizing: border-box;
    border: solid 3px transparent;
    border-top-color: cadetblue;
    border-left-color: cadetblue;
    border-radius: 50%;
    animation: ${rotate} 400ms linear infinite;
  }
`;

export default LoaderStyled;
