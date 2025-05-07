import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/db';
import { motion } from 'framer-motion';

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderRef = doc(db, 'orders', orderId);
                const orderSnap = await getDoc(orderRef);
                if (orderSnap.exists()) {
                    setOrder({ id: orderSnap.id, ...orderSnap.data() });
                } else {
                    setError('No se encontró la orden.');
                }
            } catch (err) {
                setError('Error al obtener la orden.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    if (loading) {
        return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="order-detail">Cargando...</motion.div>;
    }
    if (error) {
        return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="order-detail text-red-500">{error}</motion.div>;
    }
    if (!order) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.98 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="order-detail flex justify-center items-center min-h-[60vh]"
        >
            <motion.div 
                className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full border border-gray-100"
                initial={{ scale: 0.98, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <h2 className="text-3xl font-bold mb-4 text-indigo-700 text-center">¡Compra realizada!</h2>
                <p className="mb-2 text-gray-700"><strong>ID de la orden:</strong> <span className="text-indigo-600">{order.id}</span></p>
                <p className="mb-2 text-gray-700"><strong>Comprador:</strong> {order.buyer?.nombre} <span className="text-gray-500">({order.buyer?.email}, {order.buyer?.numero})</span></p>
                <p className="mb-2 text-gray-700"><strong>Estado:</strong> <span className="text-green-600 font-semibold">{order.status}</span></p>
                <p className="mb-4 text-gray-700"><strong>Fecha:</strong> {order.createdAt ? new Date(order.createdAt.seconds ? order.createdAt.seconds * 1000 : order.createdAt).toLocaleString() : 'No disponible'}</p>
                <h3 className="font-bold mt-4 mb-2 text-lg text-indigo-700">Productos:</h3>
                <ul className="mb-4 divide-y divide-gray-100">
                    {order.items?.map((item) => (
                        <motion.li 
                            key={item.id} 
                            className="py-2 flex justify-between items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="font-medium text-gray-800">{item.quantity} x {item.name}</span>
                            <span className="text-gray-500">${item.price} c/u</span>
                        </motion.li>
                    ))}
                </ul>
                <p className="font-bold text-xl text-indigo-700 mb-6">Total: ${order.total}</p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex justify-center">
                    <Link to="/" className="checkout-button bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-200">
                        Volver a la tienda
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default OrderDetail; 