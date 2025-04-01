import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Item from "./item";
import { Row } from 'react-bootstrap';
import Lottie from 'lottie-react'; 
import animationData from '../assets/loading.json'; 

    function CategoryProducts() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch(
        `https://dummyjson.com/products/category/${categoryName}`
        );
        if (!response.ok) {
        throw new Error("No se pudieron cargar los productos.");
        }
        const data = await response.json();
        setProducts(data.products);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }

    fetchProducts();
    }, [categoryName]);

    if (loading) {
    return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
    <Lottie animationData={animationData} style={{ width: 200, height: 200 }} />
    </div>
    );
}

    if (error) return <p>Error: {error}</p>;

    return (
    <div className="container mx-auto mt-8">
    <h2 className="text-2xl font-bold mb-4 font-serif text-white">Productos de {categoryName}</h2>
    <Row>
    {products.map((product) => (
    <Item key={product.id} item={product} />
        ))}
    </Row>
    </div>
);
}

export default CategoryProducts;