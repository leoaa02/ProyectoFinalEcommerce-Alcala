import React from 'react';

    const CartItem = ({ item }) => {
    return (
        <li className="cartItem">
        <div className="itemDetails">
        <div>
            <h3 className="itemName">{item.name}</h3>
            <p className="itemQuantity">Cantidad: {item.quantity}</p>
            <p className="itemPrice">Precio: ${item.price}</p>
        </div>
        </div>
        </li>
)
}

export default CartItem;
