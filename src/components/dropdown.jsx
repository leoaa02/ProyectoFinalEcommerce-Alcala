import { useState } from "react";
import { Link } from "react-router";

            function Dropdown() {
            
            const [isOpen, setIsOpen] = useState(false);
            const categoryMap = {
                Computación: "laptops",
                Celulares: "smartphones",
                Tablets: "tablets",
                
            };    
            return (
            <div className="relative" style={{ zIndex: 20 }} >
    
            <button
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="text-black px-4 py-2 rounded-md hover:bg-sky-400 hover:text-white transition-all cursor-pointer"
            >
            Categoria
            </button>

            {isOpen && (
            <div 
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)} 
            className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg cursor-pointer">
            <ul className="py-2">
            {Object.entries(categoryMap).map(([displayName, categoryName]) => (
            <li key={categoryName} className="px-4 py-2 hover:bg-sky-400 cursor-pointer">
            <Link to={`/category/${categoryName}`} className="block w-full tex-black no-underline">
            {displayName}
            </Link>
            </li>
            ))}
            </ul>
            
            </div>)}
            </div>
);
}

export default Dropdown;
