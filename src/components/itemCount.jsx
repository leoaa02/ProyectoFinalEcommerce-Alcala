import { getListItemIconUtilityClass } from "@mui/material";
import { useState, useContext } from "react";
import { CartContext } from "../context/cartContext";

function ItemCount ({id,name,price,product}){
    const [count, setCount]= useState(0)
    const {addProduct} = useContext(CartContext)

    const handleSub= () =>{
        setCount (count-1)
    }
    const handleAdd = ()=>{
        setCount (count+1)

    }
    const handleAddProduct= ()=>addProduct({...product, quantity: count} )

    return (
        <div>
            <p>{count} </p>
            <button className="see-more-button text-white no-underline" onClick={handleSub}>-</button>
            <button className="see-more-button text-white no-underline" onClick={handleAdd}>+</button>
            <button className="see-more-button text-white no-underline" onClick={handleAddProduct}>Agregar al carrito</button>
        </div>
    )
}
export default ItemCount