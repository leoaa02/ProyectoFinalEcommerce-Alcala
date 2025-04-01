import React from "react";
import Lottie from "lottie-react";
import animationContact from '../assets/contact.json';

function Contacto() {
    return (
        <>
        <div className="mt-10 bg-gradient-to-r from-purple-800 to-indigo-700 rounded-md mx-auto text-center max-w-lg py-2">
        <h1 className="mt-20 text-white text-xl font-serif text-center ">Contáctanos</h1>
        <h2 className="mt-20 ml-10 text-white text-lg text-center font-serif">Email:</h2>
        <h4 className="ml-10 text-yellow text-center font-serif">astrobuy-store@shop.com</h4>
        <h2 className="mt-30 ml-10 text-white text-lg text-center  font-serif">Telefono:</h2>
        <h4 className="ml-10 text-yellow text-center font-serif">0800-3001</h4>
        <h2 className="mt-30 ml-10 text-white text-center text-lg  font-serif">Dirección:</h2>
        <h4 className="ml-10 text-yellow text-center font-serif">GreenHower 651</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: "flex-end", alignItems: "flex-end", height: '300px' }}>
        <Lottie animationData={animationContact} style={{ width: 300, height: 300 }} />
        </div>
        </>
);
}

export default Contacto;