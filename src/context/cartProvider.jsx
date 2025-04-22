import { useState } from "react";
import { CartContext } from "./cartContext";

function CartProvider ({children}){
    const [cart,setCart]= useState([])

    const addProduct=product =>setCart([...cart, product])
    const getProductsQuantity= () =>{
    const justQuantity=  cart.map(prod=> prod.quantity)
    const totalQuantity= justQuantity.reduce((acc, current)=>acc + current, 0)
    
    return totalQuantity
    }
    
    return (
    <CartContext.Provider value={{addProduct, getProductsQuantity}}>
    {children}
    </CartContext.Provider>
    )
}
export default CartProvider