import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Item({ item }) {
    if (!item) return null;

    return (
        <motion.div 
            className="col-lg-3 col-md-6 col-sm-12 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="item-card custom-card">
                {item.thumbnail && (
                    <div className="card-img-container">
                        <Card.Img
                            variant="top"
                            src={item.thumbnail}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                            alt={item.name || 'Producto'}
                        />
                    </div>
                )}

                <Card.Body className="item-card-body">
                    <div>
                        <Card.Title className="item-title">{item.name}</Card.Title>
                        <Card.Subtitle className="item-category">{item.category}</Card.Subtitle>
                        <Card.Text className="item-description">
                            {item.description}
                        </Card.Text>
                    </div>
                    <div className="card-button-container">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link 
                                to={`/product/${item.id}`} 
                                className="see-more-button"
                            >
                                Ver más
                            </Link>
                        </motion.div>
                    </div>
                </Card.Body>
            </Card>
        </motion.div>
    );
}

export default Item;