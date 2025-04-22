import Lottie from "lottie-react";
import animationGirlMarket from '../assets/girl-market.json';
import { Container } from "react-bootstrap";
import ItemListContainer from "./ItemListContainer";

    function Products (){
    return (
        <>
        <h1 className="mt-20 text-white text-xl font-arial text-center font-serif ">Todos los Productos</h1>
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "flex-start", height: '300px' }}>
        <Lottie animationData={animationGirlMarket} style={{ width: 300, height: 300,}} />
        </div>
        <Container>
        <ItemListContainer/>
        </Container>
            
            
        </>

)}
export default Products;