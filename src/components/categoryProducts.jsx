import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Item from "./item";
import { Row } from 'react-bootstrap';
import Lottie from 'lottie-react';
import animationData from '../assets/loading.json';
import { db } from "../firebase/db";
import getProductsByCategory from "../firebase/db";

function CategoryProducts() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProductsByCategory() {
            setLoading(true);
            setError(null);
            try {
                const productsData = await getProductsByCategory(categoryName);
                setProducts(productsData);
            } catch (err) {
                setError(`Error al cargar los productos de la categoría "${categoryName}": ${err.message}`);
            } finally {
                setLoading(false);
            }
        }

        fetchProductsByCategory();
    }, [categoryName]);

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