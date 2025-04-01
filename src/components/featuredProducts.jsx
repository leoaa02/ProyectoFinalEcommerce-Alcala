import React, { useState, useEffect } from 'react';
import Item from './item'; 
import { Row } from 'react-bootstrap';
import Lottie from 'lottie-react';
import animationData from '../assets/loading.json';

const FeaturedProducts = () => {
const [featuredProducts, setFeaturedProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

        useEffect(() => {

        fetch('https://dummyjson.com/products?limit=4') 
        .then((response) => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();})
        .then((data) => {
        setFeaturedProducts(data.products || data); 
        setLoading(false);})
        .catch((err) => {
        setError(err);
        setLoading(false);
});
}, []);

        if (loading) {
        return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Lottie animationData={animationData} style={{ width: 200, height: 200 }} />
        </div>
        );
}

        if (error) {
        return <p>Error al cargar productos destacados: {error.message}</p>;
}

        return (
        <div className="featured-products mt-8">
        <h2 className="text-center mb-4 text-lg font-serif text-white">Productos Destacados</h2>
        <Row>
        {featuredProducts.map((product) => (
        <Item key={product.id} item={product} />
        ))}
        </Row>
        </div>
);
};

export default FeaturedProducts;