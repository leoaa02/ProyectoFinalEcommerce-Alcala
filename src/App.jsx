import './App.css'
import Navbar from './components/navbar'
import ItemListContainer from './components/ItemListContainer'

const mensaje= "Bienvenidos a Astro Buy";

function App() { 
return (
  <>
  
  <Navbar/>
  <ItemListContainer mensaje={mensaje} />

  </>
  );
  }

export default App
