import styled from "styled-components";

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: #fff;
  margin: 0.5rem;
  font-size: 1.25rem;
  border: 1px solid transparent;
  outline: 1px solid transparent;
  background-color: #333;
  cursor: pointer;
  &:hover {
    background-color: cadetblue;
  }
  &[disabled] {
    opacity: 0.5;
    cursor: default;
  }
`;

export default ButtonStyled;
