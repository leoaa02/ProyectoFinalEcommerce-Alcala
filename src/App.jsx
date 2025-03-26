import './App.css'
import Navbar from './components/navbar'
import ItemListContainer from './components/ItemListContainer'
import Carousel from './components/carousel';

        const mensaje= "Bienvenidos a Astro Buy";

        function App() { 
        return (
        <>

        <Navbar/>
        <div><Carousel/></div>
        
        </>
        );}

export default App
