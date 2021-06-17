import styled from "styled-components";

const ProductCartStyled = styled.div`
  display: flex;
  align-items: center;
  & .qty {
    display: flex;
    align-items: center;
    padding-left: 2rem;
    & span {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      border: 1px solid cadetblue;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      margin: 0.5rem;
    }
  }
`;

export default ProductCartStyled;
