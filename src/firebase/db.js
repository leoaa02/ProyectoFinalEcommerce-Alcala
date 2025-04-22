import { collection, getFirestore, getDocs } from "firebase/firestore"; 
import { app } from "./firebase";


export const db=getFirestore(app)
export async function getItems() {
    const querySnapshot= await getDocs(collection(db,"products"));
    querySnapshot.forEach(doc =>console.log(`${doc.id}=>${doc.data()}`))
}