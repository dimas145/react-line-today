import React, { useState, useEffect } from "react"
import { Row, Card, Button } from "react-bootstrap"

export default function CardComponent(props) {
    const [bookmarked, setBookmarked] = useState(false);

    var bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
    if (!(bookmarks instanceof Array)) {
        bookmarks = [];
    }

    useEffect(() => {
        setBookmarked(bookmarks.some((el) => {
            return ((el.img === props.img) && (el.title === props.title) && (el.publisher === props.publisher) && (el.url === props.url))
        }));
    }, []);

    const cardOnClick = () => {
        window.open(props.url, "_blank");
    }

    const btnOnClick = () => {
        bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
        if (!(bookmarks instanceof Array)) {
            bookmarks = [];
        }

        if (bookmarked) {
            // remove
            bookmarks = bookmarks.filter((el) => {
                return ((el.img !== props.img) && (el.title !== props.title) && (el.publisher !== props.publisher) && (el.url !== props.url))
            })
            window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

            setBookmarked(false);
        } else {
            // add
            bookmarks.push(props);
            window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

            setBookmarked(true);
        }
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
                {bookmarked ? (
                    <Button onClick={btnOnClick} variant="danger">Unbookmark</Button>
                ) : (
                    <Button onClick={btnOnClick}>Bookmark</Button>
                )}
            </Row>
        </div>
    );
}
