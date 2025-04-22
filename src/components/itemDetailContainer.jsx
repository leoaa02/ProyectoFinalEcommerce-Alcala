import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Lottie from 'lottie-react';
import animationData from '../assets/loading.json';
import ItemCount from './itemCount';

    function ItemDetailComponent() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    async function fetchProduct() {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
        throw new Error('No se pudo cargar el producto.');
        }
        const data = await response.json();
        setProduct(data);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }

    fetchProduct();
    }, [productId]);

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

    if (!product) {
    return <p>Producto no encontrado.</p>;
    }

        return (
        <div className="container mx-auto mt-8 p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-4 text-center">{product.title}</h2>
        <div className="flex justify-center mb-4">
        {product.thumbnail && (
        <img src={product.thumbnail} alt={product.title} className="max-w-md max-h-96 object-cover rounded-md" />
        )}
        </div>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-lg font-semibold">Precio: ${product.price}</p>
        <ItemCount product={product.detail} />
        </div>
        
        </div>
);}
    

export default ItemDetailComponent;