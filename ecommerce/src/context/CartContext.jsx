import {
  createContext,
  useState,
  useEffect,
  useContext
} from "react";

import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

function CartProvider({ children }) {

  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  // LOAD USER CART
  useEffect(() => {

    try {

      if (user?.email) {

        const savedCart = localStorage.getItem(
          `cart_${user.email}`
        );

        if (savedCart) {

          setCart(JSON.parse(savedCart));

        } else {

          setCart([]);

        }

      } else {

        // LOGOUT = EMPTY CART UI
        setCart([]);

      }

    } catch (err) {

      console.log("Cart load error:", err);
      setCart([]);

    }

    setCartLoaded(true);

  }, [user]);

  // SAVE USER CART
  useEffect(() => {

    if (user?.email) {

      localStorage.setItem(
        `cart_${user.email}`,
        JSON.stringify(cart)
      );

    }

  }, [cart, user]);

  // ADD TO CART
  const addToCart = (product) => {

    const exist = cart.find(
      (item) => item.id === product.id
    );

    if (exist) {

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: item.qty + 1
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          qty: 1
        }
      ]);

    }
  };

  // REMOVE FROM CART
  const removeFromCart = (id) => {

    setCart(
      cart.filter((item) => item.id !== id)
    );

  };

  // INCREASE QTY
  const increaseQty = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + 1
            }
          : item
      )
    );

  };

  // DECREASE QTY
  const decreaseQty = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id && item.qty > 1
          ? {
              ...item,
              qty: item.qty - 1
            }
          : item
      )
    );

  };

  // REMOVE ORDERED ITEMS ONLY
  const removeOrderedItems = (orderedItems) => {

    const orderedIds = orderedItems.map(
      (item) => item.id
    );

    const updatedCart = cart.filter(
      (item) => !orderedIds.includes(item.id)
    );

    setCart(updatedCart);

  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  return (

    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartLoaded,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        removeOrderedItems,
        clearCart
      }}
    >

      {children}

    </CartContext.Provider>

  );
}

export default CartProvider;