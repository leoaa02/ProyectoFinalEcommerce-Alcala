import { useState,useEffect } from "react";
import ItemList from "./itemList";
import withLoading from "./hoc/loading";


        const ItemListWithLoading= withLoading(ItemList);
        function ItemListContainer(){
        const [items,setItems]=useState([]);
        const [loading,setLoading]=useState(true);

        useEffect(()=>{
        const getItems= async ()=>{
        try {
                const res = await fetch("https://dummyjson.com/products");
                const data = await res.json();
                setItems(data.products); 
                setLoading(false);
                } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
                }
        };
        getItems()
        },[])
        return <ItemListWithLoading isLoading={loading} items={items} />;
        
        }

export default ItemListContainer;