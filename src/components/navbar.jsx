import { useState } from "react"
import Categoria from "./categoria";
import Dropdown from "./categoria";

function Navbar(){
    
    const [isMenuOpen, setIsMenuOpen ]= useState(false);
    const itemsInCart= 5;
    return (
        
            <div className='w-full h-full relative z-20 bg-white'>
            <div className="w-full h-full absolute top-10 left-0  bg-gradient-to-r from-blue-400 to-indigo-400 z-0"></div>


            <header className="flex relative z-10 justify-between items-center text-black py-6 px-8
            md:px-32 bg-white drop-shadow-md">
            <a href="#" className="astro flex items-center">Astro Buy 
            <img src="src/assets/rocket.png" alt="rocket" className="w-12 ml-2
                hover:scale-105 transition-all" />
            </a>
            <darkmode/>

            <ul className="hidden xl:flex items-center
                gap-12 font-semibold  text-base">
                <li className="p-3 hover:bg-sky-400
                hover:text-white rounded-md transition-all
                cursor-pointer">Inicio</li>
                <li className="p-3 hover:bg-sky-400
                hover:text-white rounded-md transition-all
                cursor-pointer">Productos</li>
                <Dropdown/>
                <li className="p-3 hover:bg-sky-400
                hover:text-white rounded-md transition-all
                cursor-pointer">Contacto</li>
                </ul>

                <div className="relative hidden md:flex items-center justify-center
                gap-3">
                <i className="bx bx-cart-add absolute left-3 text-2xl 
                text-gray-500 cursor-pointer "></i>
                {itemsInCart> 0 &&(<span className="absolute top-0 right-0 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center
                justify-center"> {itemsInCart} </span>)}
                

            </div>
            
            <i className="bx bx-menu xl:hidden block text-5xl 
            cursor-pointer" onClick={()=>setIsMenuOpen(!isMenuOpen)}></i>

            <div className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transition-all ${isMenuOpen ? "block": "hidden"} xl:hidden`} 
            style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
                <ul>
                <li className="list-none w-full text-center p-4 hover:bg-sky-400 
                hover:text-white transition-all cursor-pointer">Inicio</li>
                <li className="list-none w-full text-center p-4 hover:bg-sky-400 
                hover:text-white transition-all cursor-pointer">Productos</li>
                <li className="list-none w-full text-center p-4 hover:bg-sky-400 
                hover:text-white transition-all cursor-pointer">Categoria</li>
                <li className="list-none w-full text-center p-4 hover:bg-sky-400 
                hover:text-white transition-all cursor-pointer">Contacto</li>
                </ul>
            </div>
            </header>
        
            </div>
);
}

export default Navbar