import { doc, getFirestore, getDoc, collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { app } from "./firebase";

export const db = getFirestore(app);

export async function getItems(params) {
    try {
        console.log("Iniciando getItems");
        const productsCollection = collection(db, "products");
        console.log("Colección obtenida");
        
        const querySnapshot = await getDocs(productsCollection);
        console.log("QuerySnapshot obtenido, número de documentos:", querySnapshot.size);
        
        if (querySnapshot.empty) {
            console.log("No se encontraron documentos en la colección");
            return [];
        }

        const items = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Procesando documento:", { id: doc.id, ...data });
            items.push({
                id: doc.id,
                ...data
            });
        });
        
        console.log("Total de items procesados:", items.length);
        return items;
    } catch (error) {
        console.error("Error en getItems:", error);
        if (error.code === 'permission-denied') {
            throw new Error('Error de permisos: No se puede acceder a los productos. Por favor, verifica las reglas de seguridad en Firebase.');
        } else {
            throw new Error('Error al cargar los productos: ' + error.message);
        }
    }
}
    
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
        
        

        export const createOrder = async (order) => {
            try {
                console.log("Iniciando creación de orden:", order);
                const ordersCollection = collection(db, "orders");
                console.log("Colección de órdenes obtenida");
                
                const orderData = {
                    ...order,
                    createdAt: new Date(),
                    status: 'pending'
                };
                console.log("Datos de la orden preparados:", orderData);
                
                const docRef = await addDoc(ordersCollection, orderData);
                console.log("Orden creada con ID:", docRef.id);
                
                return docRef.id;
            } catch (error) {
                console.error("Error detallado al crear la orden:", {
                    message: error.message,
                    code: error.code,
                    stack: error.stack
                });
                throw new Error('Error al crear la orden: ' + error.message);
            }
        } 