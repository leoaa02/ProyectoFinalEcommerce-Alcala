import { doc, getFirestore, getDoc, collection,getDocs,query, where, addDoc } from "firebase/firestore";
import { app } from "./firebase";


export const db= getFirestore(app);

    export async function getItems(params) {
    const querySnapshot= await getDocs(collection(db,"products"))
    const items=[]
    querySnapshot.forEach ((doc)=>{
        items.push(doc.data())
    })
    
    return items}
    
        export const getSingleItem = async (itemId) => {
        try {
        const itemRef = doc(db, "products", itemId); 
        const docSnap = await getDoc(itemRef);
    
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            
            console.log("No se encontró el documento con el ID:", itemId);
            return null;
        }
        } catch (error) {
        console.error("Error al obtener el documento:", error);
        return null; 
        }
        };

        export default async function getProductsByCategory(categoryName) {
            try {
                const db = getFirestore(app);
                const productsCollection = collection(db, 'products'); 
        
                
                const q = query(productsCollection, where('category', '==', categoryName));
        
                const querySnapshot = await getDocs(q);
                const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                return products;
            } catch (error) {
                console.error("Error al obtener productos por categoría:", error);
                return []; 
            }
        }
        
        

        export const createOrder= async (order)=>{
            try{
                const docRef= await addDoc(collection(db,"orders"), order)

                
                console.log("Document written with", docRef.id);
            }   catch(e){
                console.error ("Error happening", e);
            }
        } 