import { useState } from "react";

            function Dropdown() {
            const [isOpen, setIsOpen] = useState(false);

            return (
            <div className="relative">
    
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black px-4 py-2 rounded-md hover:bg-sky-400 hover:text-white transition-all cursor-pointer"
            >
            Categoria
            </button>

            {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg cursor-pointer">
            <ul className="py-2">
            <li className="px-4 py-2 hover:bg-sky-400 cursor-pointer">Computación</li>
            <li className="px-4 py-2 hover:bg-sky-400 cursor-pointer">Celulares</li>
            <li className="px-4 py-2 hover:bg-sky-400 cursor-pointer">Accesorios</li>
            <li className="px-4 py-2 hover:bg-sky-400 cursor-pointer">Audio y Video</li>
            </ul>
            </div>)}
            </div>
);
}

export default Dropdown;
