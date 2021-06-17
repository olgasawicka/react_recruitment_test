import React from "react";
import ProductCartStyled from "./ProductCartStyled";
import Button from "../common/Button/Button";

const ProductCart = ({ product, addToCart, removeFromCart, qty }) => {
  const { pid, min, max, isBlocked } = product;

  return (
    <ProductCartStyled>
      <Button disabled={isBlocked} onClick={() => addToCart({ pid })}>
        +
      </Button>
      <Button disabled={isBlocked} onClick={() => removeFromCart({ pid })}>
        -
      </Button>
      <div className="qty">
        Obecnie masz <span>{qty}</span> sztuk produktu
      </div>
    </ProductCartStyled>
  );
};

export default ProductCart;
