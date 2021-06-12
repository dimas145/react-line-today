import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom";
import CardComponent from "./CardComponent";

var cardProps = [];
var feeds = [];
var bookmarks = [];

export default function FeedsComponent(props) {
    const [cards, setCards] = useState([]);
    const location = useLocation();
    let { name } = useParams();

    var empty = false;

    if (location.pathname === "/bookmarks") {
        bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
        empty = (bookmarks.length === 0);
    } else {
        feeds = props.feeds.find((item) => {
            return item.name === name;
        }).templates;
    }

    // filter feeds
    useEffect(() => {
        if (location.pathname === "/bookmarks") {
            setCards(bookmarks);
        } else {
            cardProps = [];
            for (var i = 0; i < feeds.length; i++) {
                if (feeds[i].hasOwnProperty("sections")) {
                    if (feeds[i].sections[0].articles.length !== 0) {
                        var articles = feeds[i].sections[0].articles;
                        for (var j = 0; j < articles.length; j++) {
                            if (articles[j].hasOwnProperty("thumbnail") && articles[j].hasOwnProperty("title") && articles[j].hasOwnProperty("publisher") && articles[j].hasOwnProperty("url")) {
                                cardProps.push({
                                    img: "https://obs.line-scdn.net/" + articles[j].thumbnail.hash,
                                    title: articles[j].title,
                                    publisher: articles[j].publisher,
                                    url: articles[j].url.url,
                                });
                            }
                        }
                    }
                }
            }
            // remove dupe
            var temp = cardProps;
            setCards(Array.from(new Set(temp.map(JSON.stringify))).map(JSON.parse));
        }
    }, [location.pathname]);

    if (!cards.length && !empty) return (<span>loading...</span>);

    return (
        <div className="feeds_component">
            {cards.map((props) => (
                <CardComponent
                    key={props.img + props.title + props.publisher}
                    img={props.img}
                    title={props.title}
                    publisher={props.publisher}
                    url={props.url}
                />
            ))}
        </div>
    )
}
