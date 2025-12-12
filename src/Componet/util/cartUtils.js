import toast, { ToastIcon } from "react-hot-toast";

// cartUtils.js
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (product) => {
  const cart = getCart();
  const idx = cart.findIndex((item) => item.id === product.id); // use a unique field like product._id or product.id
  if (idx !== -1) {
    toast.success("Added one item")
    toast.success("added")
    cart[idx].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
};


export const updateQuantity = (productId, quantity) => {
  const cart = getCart();
  const idx = cart.findIndex(item => item.id === productId);
  if (idx !== -1) {
    cart[idx].quantity = quantity;
    if (cart[idx].quantity <= 0) {
      cart.splice(idx, 1);
    }
    saveCart(cart);
  }
};
