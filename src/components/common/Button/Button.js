import React from "react";
import ButtonStyled from "./ButtonStyled";

const Button = ({ children, onClick, add, disabled }) => {
  return (
    <ButtonStyled onClick={onClick} add={add} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
