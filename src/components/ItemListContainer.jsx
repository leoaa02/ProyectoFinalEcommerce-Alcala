import { useState, useEffect } from "react";
import { Container, Row, Alert } from "react-bootstrap";
import Item from "./item";
import withLoading from "./hoc/loading";
import { getItems } from "../firebase/db";
import { useParams } from "react-router-dom";

function ItemListContainer() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const ItemListWithLoading = withLoading(({ items }) => {
        console.log("Renderizando ItemListWithLoading con items:", items);
        return (
            <Container className="mt-3">
                {error ? (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                ) : (
                    <Row>
                        {items && items.length > 0 ? (
                            items.map((item) => {
                                console.log("Renderizando item:", item);
                                return <Item key={item.id} item={item} />;
                            })
                        ) : (
                            <Alert variant="info">
                                No se encontraron productos
                            </Alert>
                        )}
                    </Row>
                )}
            </Container>
        );
    });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                console.log("Iniciando fetchItems");
                setLoading(true);
                setError(null);
                const data = await getItems();
                console.log("Datos recibidos de Firebase:", data);
                
                if (data && Array.isArray(data) && data.length > 0) {
                    console.log("Datos válidos recibidos, actualizando estado");
                    setItems(data);
                } else {
                    console.log("No se recibieron datos válidos");
                    setError("No se encontraron productos disponibles");
                }
            } catch (error) {
                console.error("Error al obtener productos:", error);
                setError("Error al cargar los productos: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return (
        <ItemListWithLoading items={items} loading={loading} />
    );
}

export default ItemListContainer;