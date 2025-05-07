import React, { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext.jsx';
import { createOrder } from '../firebase/db';
import { useNavigate } from 'react-router-dom';
import withLoading from './hoc/loading';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
    const { cart, getProductsQuantity, clearCart } = useContext(CartContext);
    const totalQuantity = getProductsQuantity();
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');  
    const [numero, setNumero] = useState(''); 

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!nombre || !email || !numero) {  
            setError('Por favor, ingresa tu nombre, email y número.');
            return;
        }

        if (cart.length === 0) {
            setError('El carrito está vacío.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const orderData = {
                buyer: {
                    nombre: nombre,
                    email: email,      
                    numero: numero,    
                },
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total: calculateTotal(),
                date: new Date(),
            };

            console.log("Enviando datos de la orden:", orderData);
            
            if (!orderData.items || orderData.items.length === 0) {
                throw new Error('No hay items en el carrito');
            }

            if (!orderData.buyer.nombre || !orderData.buyer.email || !orderData.buyer.numero) {
                throw new Error('Faltan datos del comprador');
            }

            const newOrderId = await createOrder(orderData);
            console.log("Orden creada con ID:", newOrderId);
            
            if (!newOrderId) {
                throw new Error('No se pudo generar el ID de la orden');
            }

            setOrderId(newOrderId);
            clearCart();
            navigate(`/order/${newOrderId}`);
        } catch (error) {
            console.error('Error detallado en el checkout:', {
                message: error.message,
                code: error.code,
                stack: error.stack
            });
            setError(error.message || 'Hubo un error al generar la orden. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return withLoading();
    }

    if (error) {
        return (
            <motion.div 
                className="checkout-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-red-500">{error}</p>
            </motion.div>
        );
    }

    if (orderId) {
        return (
            <motion.div 
                className="checkout-success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2>¡Orden generada con éxito!</h2>
                <p>Tu número de orden es: <strong>{orderId}</strong></p>
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/')} 
                    className="checkout-button"
                >
                    Volver a la tienda
                </motion.button>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className="checkout-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            {totalQuantity === 0 ? (
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    No hay productos en el carrito.
                </motion.p>
            ) : (
                <div>
                    <h3 className="resumen-title-checkout">Resumen del Carrito</h3>
                    <AnimatePresence>
                        {cart.map((item, index) => (
                            <motion.div 
                                key={item.id} 
                                className="checkout-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <span className="checkout-item-name">{item.name}</span>
                                <span className="checkout-item-price">
                                    {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <motion.div 
                        className="flex justify-between items-center mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <span className="font-bold">Total:</span>
                        <span>${calculateTotal()}</span>
                    </motion.div>

                    <motion.form 
                        onSubmit={handleCheckout} 
                        className="checkout-form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="form-group">
                            <label htmlFor="nombre" className="form-label">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numero" className="form-label">
                                Número de Teléfono:
                            </label>
                            <input
                                type="tel"  
                                id="numero"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                required
                                className="form-input"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            className="checkout-button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Finalizar Compra
                        </motion.button>
                    </motion.form>
                </div>
            )}
        </motion.div>
    );
};

export default Checkout;