import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import ItemListContainer from './components/ItemListContainer';
import Carousel from './components/carousel';
import Contacto from './components/contacto';
import CategoryProducts from './components/categoryProducts';
import ItemDetailContainer from './components/itemDetailContainer';
import { CartProvider } from './context/cartContext';
import Cart from './components/Cart/cart';
import Checkout from './components/checkout';
import OrderDetail from './components/OrderDetail';
        
function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <div className="fixed inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 z-0"></div>
                <div className="relative z-10 min-h-screen">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Carousel />
                                <ItemListContainer />
                            </>
                        } />
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/category/:categoryName" element={<CategoryProducts />} />
                        <Route path="/product/:productId" element={<ItemDetailContainer />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order/:orderId" element={<OrderDetail />} />
                    </Routes>
                </div>
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;