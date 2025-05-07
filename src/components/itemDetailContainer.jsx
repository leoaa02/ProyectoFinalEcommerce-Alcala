import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/loading.json';
import ItemCount from './itemCount';
import { getSingleItem } from '../firebase/db';
import { CartContext } from '../context/cartContext';

function ItemDetailContainer() {
    const { productId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        setLoading(true);
        getSingleItem(productId)
            .then((data) => {
                setItem(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching item:", error);
                setError("No se pudo cargar el producto.");
                setLoading(false);
            });
    }, [productId]);

    const handleAddToCart = (quantity) => {
        if (item) {
            addItem(item, quantity);
            setAddedToCart(true);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <Lottie animationData={animationData} style={{ width: 200, height: 200 }} />
            </div>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!item) {
        return <p>Producto no encontrado.</p>;
    }

    return (
        <div className="container mx-auto mt-8 p-4">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-3xl font-bold mb-4 text-center">{item.name}</h2>
                <div className="flex justify-center mb-4">
                    {item.thumbnail && (
                        <img src={item.thumbnail} alt={item.name} className="max-w-md max-h-96 object-cover rounded-md" />
                    )}
                </div>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <p className="text-lg font-semibold mb-4">Precio: ${item.price}</p>
                {!addedToCart ? (
                    <ItemCount 
                        product={item} 
                        onAdd={handleAddToCart}
                        initial={1}
                        stock={item.stock || 10}
                    />
                ) : (
                    <div className="text-center">
                        <p className="text-green-600 font-semibold mb-2">¡Producto añadido al carrito!</p>
                        <button 
                            onClick={() => setAddedToCart(false)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Añadir más
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemDetailContainer;