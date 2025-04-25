import React, { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/db';
import { useNavigate } from 'react-router';
import withLoading from './hoc/loading';

const Checkout = () => {
    const { cart, getProductsQuantity } = useContext(CartContext);
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

            const docRef = await addDoc(collection(db, 'orders'), orderData);
            setOrderId(docRef.id);
            clearCart();  
            navigate(`/order/${docRef.id}`);
        } catch (e) {
            return('Error al generar la orden: ', e);
            setError('Hubo un error al generar la orden. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return withLoading()
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (orderId) {
        return (
            <div className="mt-10 bg-white rounded-md mx-auto text-center max-w-lg py-2">
                <h2 className="text-2xl font-bold mb-4">¡Orden generada con éxito!</h2>
                <p className="mb-2">Tu número de orden es: <strong className="text-blue-500">{orderId}</strong></p>
                <button onClick={() => navigate('/')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Volver a la tienda</button>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            {totalQuantity === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <div>
                    <h3 className="resumen-title-checkout">Resumen del Carrito</h3>
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="item-name-checkout">{item.name}</span>
                            <span>{item.quantity} x ${item.price} = ${item.quantity * item.price}</span>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <span className="font-bold">Total:</span>
                        <span>${calculateTotal()}</span>
                    </div>

                    <form onSubmit={handleCheckout} className="mt-4">
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="numero" className="block text-gray-700 text-sm font-bold mb-2">
                                Número de Teléfono:
                            </label>
                            <input
                                type="telephone"  
                                id="numero"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Finalizar Compra
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Checkout;