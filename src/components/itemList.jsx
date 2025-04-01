import Item from "./item";
import { Container, Row } from "react-bootstrap";


    function ItemList({ items }) {
    return (
    <Container className="mt-3">
    <Row> 
    {items.map((item) => (
    <Item item={item} key={item.id} />
    ))}
    </Row>
    </Container>
);
}

export default ItemList;