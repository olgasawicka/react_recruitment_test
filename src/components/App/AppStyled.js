import styled from "styled-components";

const AppStyled = styled.div`
  width: 100%;
  min-width: 800px;
  max-width: 1000px;
  margin: 100px auto 0 auto;

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid silver;
    list-style: none;
  }

  & .total {
    display: flex;
    font-size: 1.25rem;
    font-weight: bold;
    justify-content: flex-end;
    padding-right: 1em;
  }
`;

export default AppStyled;
