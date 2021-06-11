import React from "react"
import { Card } from "react-bootstrap"

export default function CardComponent(props) {
    const cardOnClick = () => {
        window.open(props.url, "_blank");
    }

    return (
        <div className="cards">
            <Card onClick={cardOnClick}>
                <Card.Img variant="top" src={props.img} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{props.publisher}</small>
                </Card.Footer>
            </Card>
        </div>
    );
}
