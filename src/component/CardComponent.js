import React from "react"
import { Row, Card, Button } from "react-bootstrap"

export default function CardComponent(props) {
    const cardOnClick = () => {
        window.open(props.url, "_blank");
    }

    const btnOnClick = () => {
        var bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
        if (!(bookmarks instanceof Array)) {
            bookmarks = [];
        }
        bookmarks.push(props);
        // remove dupe
        var temp = bookmarks;
        bookmarks = Array.from(new Set(temp.map(JSON.stringify))).map(JSON.parse);
        window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    return (
        <div className="cards">
            <Row>
                <Card onClick={cardOnClick}>
                    <Card.Img variant="top" src={props.img} />
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{props.publisher}</small>
                    </Card.Footer>
                </Card>
            </Row>
            <Row>
                <Button onClick={btnOnClick}>Bookmark</Button>
            </Row>
        </div>
    );
}
