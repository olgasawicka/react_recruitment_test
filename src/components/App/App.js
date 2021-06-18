import React, { useEffect, useState } from "react";
import AppStyled from "./AppStyled";
import Loader from "../common/Loader/Loader";
import ProductCart from "../ProductCart/ProductCart";

const App = () => {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/cart");
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updatedCart = data
      ? data.map((product) =>
          product.min > 0
            ? { pid: product.pid, quantity: product.min }
            : { pid: product.pid, quantity: 0 }
        )
      : [];
    setCart([...updatedCart]);
  }, [data]);

  useEffect(() => {
    const subtotal = cart.reduce((total, current) => {
      const product = data.find(({ pid }) => pid === current.pid);
      return product ? total + current.quantity * product.price : total;
    }, 0);
    setTotal(subtotal);
  }, [cart]);

  const addQuantity = (newItem) => {
    const updatedCart = [...cart];

    const updatedItemIndex = updatedCart.findIndex(
      (item) => item.pid === newItem.pid
    );

    if (updatedItemIndex < 0) {
      updatedCart.push({ ...newItem, quantity: +1 });
    } else {
      const updatedItem = updatedCart[updatedItemIndex];
      updatedItem.quantity += 1;
      updatedCart[updatedItemIndex] = updatedItem;
    }

    setCart([...updatedCart]);
  };

  const removeQuantity = (newItem) => {
    const product = data.find((product) => product.pid === newItem.pid);
    const min = product ? product.min : 0;
    const currentProduct = cart.find(({ pid }) => pid === newItem.pid);
    const productsButCurrent = cart.filter(({ pid }) => pid !== newItem.pid);

    if (currentProduct.quantity >= min) {
      currentProduct.quantity--;
    }

    setCart([...productsButCurrent, currentProduct]);
  };

  const resetQty = (pid, min) => {
    const productIndex = cart.findIndex((product) => product.pid === pid);
    if (productIndex > -1)
      setCart([...cart, (cart[productIndex].quantity = min)]);
  };

  if (!data) return <Loader />;

  return (
    <AppStyled>
      <h3>Lista produktów</h3>
      <ul>
        {data.map((product) => (
          <li key={product.pid} className="row">
            {product.name}, cena: {product.price} zł
            <ProductCart
              pid={product.pid}
              min={product.min}
              max={product.max}
              isBlocked={product.isBlocked}
              addQuantity={addQuantity}
              removeQuantity={removeQuantity}
              resetQty={resetQty}
              qty={
                cart.length &&
                cart[cart.findIndex((el) => el.pid === product.pid)].quantity
              }
            />
          </li>
        ))}
      </ul>
      <div className="total">Suma zamówienia: {total && total.toFixed(2)}</div>
    </AppStyled>
  );
};

export { App };
