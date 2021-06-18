import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import ProductCartStyled from "./ProductCartStyled";
import { debounce } from "lodash";
import Button from "../common/Button/Button";

const ProductCart = ({
  pid,
  min,
  max,
  isBlocked,
  addQuantity,
  removeQuantity,
  resetQty,
  qty,
}) => {
  const onQtyCheck = () => {
    fetch("/api/product/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pid: pid, quantity: qty }),
    })
      .then((response) => response.json())
      .then((data) => {
        const errorTypes = ["INCORRECT_QUANTITY", "INCORRECT_TYPE"];
        errorTypes.includes(data.errorType)
          ? resetQty(pid, min)
          : "or sth else";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const debouncedOnQtyCheck = useMemo(() => debounce(onQtyCheck, 500), [qty]);

  useEffect(() => {
    debouncedOnQtyCheck();
  }, [qty]);

  const changeQty = (calcType) => {
    if (calcType === "add") {
      addQuantity({ pid });
    } else {
      removeQuantity({ pid });
    }
  };

  return (
    <ProductCartStyled>
      <Button disabled={isBlocked} onClick={() => changeQty("add")}>
        +
      </Button>
      <Button disabled={isBlocked} onClick={() => changeQty("remove")}>
        -
      </Button>
      <div className="qty">
        Obecnie masz <span>{qty}</span> sztuk produktu
      </div>
    </ProductCartStyled>
  );
};

const { string, number, func, bool } = PropTypes;

ProductCart.propTypes = {
  pid: string.isRequired,
  min: number,
  max: number,
  isBlocked: bool,
  addQuantity: func,
  removeQuantity: func,
  resetQty: func,
  qty: number,
};

ProductCart.defaultProps = {
  min: 0,
  max: 0,
  isBlocked: false,
  addQuantity: () => {},
  removeQuantity: () => {},
  resetQty: () => {},
  qty: 0,
};

export default ProductCart;
