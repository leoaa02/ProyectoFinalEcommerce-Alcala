import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../../context/cartContext";
import CartItem from "./cartItem";

function Cart() {
    const { cart, getProductsQuantity } = useContext(CartContext);
    const totalQuantity = getProductsQuantity();

    if (totalQuantity === 0) {
        return (
            <div className="emptyCart">
                <p>El carrito está vacío.</p>
                <Link to="/" className="backToShop">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="mt-10 bg-white rounded-md mx-auto text-center max-w-lg py-2">
            <h2 className="cartTitle">Carrito de Compras</h2>
            <ul className="cartItemsList">
                {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </ul>
            <p className="cartTotal">Total de productos: {totalQuantity}</p>
            
            <Link to="/checkout" className="checkoutButton">Ir al Checkout</Link>
        </div>
    );
}

export default Cart;