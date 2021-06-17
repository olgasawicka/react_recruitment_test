import React, { useEffect, useState } from "react";
import "./App.css";
import ProductCart from "../ProductCart/ProductCart";

const App = () => {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/cart");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  if (!data) return <div>...Loading</div>;

  const addToCart = (newItem) => {
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

  const removeFromCart = (newItem) => {
    const updatedCart = [...cart];
    const updatedItemIndex = updatedCart.findIndex(
      (item) => item.pid === newItem.pid
    );
    const updatedItem = { ...updatedCart[updatedItemIndex] };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }

    setCart([...updatedCart]);
  };

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <ul>
        {data.map((product) => (
          <li key={product.pid} className="row">
            {product.name}, cena: {product.price}zł
            <ProductCart
              product={product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              qty={
                cart[cart.findIndex((el) => el.pid === product.pid)]
                  ? cart[cart.findIndex((el) => el.pid === product.pid)]
                      .quantity
                  : 0
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { App };
