import { useState, useEffect, useContext } from "react";
import Dropdown from "./dropdown";
import { Link, useNavigate } from "react-router"; 
import ProductCard from "./Cart/cart";
import { CartContext } from "../context/cartContext";
import rocketImg from '../../assets/rocket.png';




    function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {getProductsQuantity, cart}= useContext(CartContext); 
    const quantity= getProductsQuantity();
    
    const navigate= useNavigate();

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };
    
    
    return (
        <header className='flex relative z-20 justify-between items-center text-black py-6 px-8 md:px-32 bg-white drop-shadow-md'>
        <div className="flex items-center gap-4">
        <Link to="/" className="astro flex items-center font-segovia text-xl text-black no-underline">
        Astro Buy
        <img src={rocketImg} alt="rocket" className="w-12 hover:scale-105 transition-all"
        />
        </Link>
        
        </div>

        <ul className="hidden lg:flex items-center gap-12 font-semibold text-base">
        <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">
        <Link to="/" className="text-black no-underline">Inicio</Link>
        </li>
        <Dropdown />
        <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">
        <Link to="/contacto" className="text-black no-underline">Contacto</Link>
        </li>
        </ul>

        <div className="relative hidden lg:flex items-center justify-center gap-3">
            <Link to="/cart" className="text-black no-underline">
        <i className="bx bx-cart-add absolute left-3 text-2xl text-gray-500 cursor-pointer"></i>
        {quantity > 0 && (
        <span className="absolute top-0 right-0 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
            {quantity}
        </span>
        )}
        </Link>
        </div>

        <i
        className="bx bx-menu lg:hidden block text-5xl cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></i>

        <div
        className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transition-all ${
        isMenuOpen ? "block" : "hidden"
        } xl:hidden`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
        <ul>
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
        <Link to="/" className="text-black no-underline">Inicio</Link>
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
        <Dropdown/>
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
        <Link to="/contacto" className="text-black no-underline">Contacto</Link>
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
        <Link to="/cart" className="text-black no-underline">Carrito</Link>
        </li>
        </ul>
        </div>
        <div className="flex items-center gap-4">
                <div className="cartIconContainer" onClick={toggleCartVisibility}>
                    <i className="fas fa-shopping-cart text-xl"></i>
                    {quantity > 0 && (
                        <span className="cartBadge">{quantity}</span>
                    )}
                </div>
            </div>
                
                
                
    </header>
);
}

export default Navbar;