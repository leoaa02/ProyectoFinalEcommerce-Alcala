import { useState,useEffect, useContext } from "react";
//import ItemList from "./itemList";
import {Container, Row} from "react-bootstrap";
import Item from "./item";
import withLoading from "./hoc/loading";
import { CartContext } from "../context/cartContext";
import { getItems } from "../firebase/db";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/db";
import { useParams } from "react-router";


        //const ItemListWithLoading= withLoading(ItemList);
       
        function ItemListContainer(){
        const [items,setItems]=useState([]);
        const [loading,setLoading]=useState(true);


        const value = useContext(CartContext)
        console.log(value)


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
       
        return (
                <>
               
                <Container className="mt-3">
                <Row>
                {items.map((item) => (
                <Item item={item} key={item.id} />
                ))}
                </Row>
                </Container>
                </>
                )
       
        }


export default ItemListContainer;
