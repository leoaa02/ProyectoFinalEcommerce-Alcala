import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import CartItem from "./cartItem";
import { motion, AnimatePresence } from "framer-motion";

function Cart() {
    const { cart, getProductsQuantity } = useContext(CartContext);
    const totalQuantity = getProductsQuantity();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (totalQuantity === 0) {
        return (
            <motion.div 
                className="emptyCart"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p>El carrito está vacío.</p>
                <Link to="/" className="backToShop">Volver a la tienda</Link>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className="cart-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="cartTitle">Carrito de Compras</h2>
            <AnimatePresence>
                <ul className="cartItemsList">
                    {cart.map((item, index) => (
                        <motion.li
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <CartItem item={item} />
                        </motion.li>
                    ))}
                </ul>
            </AnimatePresence>
            <motion.p 
                className="cartTotal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Total de productos: {totalQuantity}
            </motion.p>
            
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="checkout-button w-full"
            >
                Ir al Checkout
            </motion.button>
        </motion.div>
    );
}

export default Cart;