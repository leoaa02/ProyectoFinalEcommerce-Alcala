import { Button, Card, CardImg, CardBody, CardTitle, CardText, Col,OverlayTrigger,Tooltip } from "react-bootstrap";
import { Link } from "react-router";

    function Item({ item }) {
    return (
    <Col lg={3} md={6} sm={1} className="mb-4">
    <Card className="item-card custom-card">
    <Card.Img variant="top" src={item.thumbnail} style={{ height: '200px', objectFit: 'cover' }} />
    <Card.Body className="item-card-body">
    <Card.Title className="item-title">{item.title}</Card.Title>
    <Card.Subtitle className="item-category">{item.category}</Card.Subtitle>
    <OverlayTrigger
    placement="bottom"
    overlay={
    <Tooltip id={`tooltip-${item.id}`}>
    {item.description}
    </Tooltip>}>
    <CardText className="item-card-description item-description">{item.description}</CardText>
    </OverlayTrigger>
    <div className="card-button-container">
    
    <Button variant="primary" className="see-more-button text-white">
    <Link to={`/product/${item.id}`} className="see-more-button text-white no-underline">See More</Link>
    </Button>
    
    </div>
    
    </Card.Body>
    </Card>
    </Col>
);
}
export default Item;