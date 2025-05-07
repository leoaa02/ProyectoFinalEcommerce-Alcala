import React, { useState } from "react";

function ItemCount({ product, onAdd, initial = 1, stock = 10 }) { 
    const [count, setCount] = useState(initial); 

    const handleSub = () => {
        if (count > 1) { 
            setCount(count - 1);
        }
    };

    const handleAdd = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    };

    const handleAddToCart = () => {
        onAdd(count);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
                <button 
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition-colors"
                    onClick={handleSub}
                    disabled={count <= 1}
                >
                    -
                </button>
                <span className="text-xl font-semibold">{count}</span>
                <button 
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition-colors"
                    onClick={handleAdd}
                    disabled={count >= stock}
                >
                    +
                </button>
            </div>
            <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
                onClick={handleAddToCart}
            >
                Agregar al carrito
            </button>
        </div>
    );
}

export default ItemCount;