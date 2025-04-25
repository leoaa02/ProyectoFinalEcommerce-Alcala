import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Item from "./item";
import withLoading from "./hoc/loading";
import { getItems } from "../firebase/db";
import { useParams } from "react-router";

        function ItemListContainer() {
        const [items, setItems] = useState([]);
        const [loading, setLoading] = useState(true);
        const { id } = useParams(); 

        const ItemListWithLoading = withLoading(({ items }) => (
        <Container className="mt-3">
        <Row>
                {items.map((item) => (
                <Item key={item.id} item={item} />
                ))}
        </Row>
        </Container>
));

        useEffect(() => {
                setLoading(true);
                getItems()
                .then(data => {
                setItems(data);
                setLoading(false);
                })
                .catch(error => {
                console.error("Error fetching items:", error);
                setLoading(false);
                });
        }, []);

        return (
        <ItemListWithLoading items={items} loading={loading} />
        );
}

export default ItemListContainer;