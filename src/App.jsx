import './App.css'
import { BrowserRouter,Routes,Route } from "react-router";
import { useState } from 'react';
import Navbar from './components/navbar'
import ItemListContainer from './components/ItemListContainer'
import Carousel from './components/carousel';
import withLoading from './components/hoc/loading';
import { Container } from 'react-bootstrap';
import FeaturedProducts from './components/featuredProducts';
import Contacto from './components/contacto';
import Products from './components/products';
import CategoryProducts from './components/categoryProducts';
import ItemDetailContainer from './components/itemDetailContainer';

        function App() { 
        const [products, setProducts] = useState([]);
        return (
        <>
        <div className="fixed inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 z-0"></div> 
        <div className="relative z-10 min-h-screen"> 
        <BrowserRouter>
        <Navbar />
        
        <Routes>
        <Route path="/" element={
        <>
        <Carousel />
        <FeaturedProducts />
        </>
        } />

        <Route path="/contacto" element={<Contacto />} /> 
        <Route path="/products" element={<Products />} />
        <Route path="/category/:categoryName" element={<CategoryProducts />} />
        <Route path="/product/:productId" element={<ItemDetailContainer />} />
        </Routes>
        </BrowserRouter>
        </div>
        </>
        );}

export default App
